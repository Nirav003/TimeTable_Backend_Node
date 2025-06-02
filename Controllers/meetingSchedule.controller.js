const mongoose = require("mongoose");
const { MeetingSchedule } = require("../Models/meetingSchedule.module");
const { TryCatch } = require("../Utils/utility");

// Create a new meeting schedule
const createMeetingSchedule = TryCatch(async (req, res) => {
  const meetingSchedule = new MeetingSchedule(req.body);
  const savedMeetingSchedule = await meetingSchedule.save();
  res.status(201).json({
    success: true,
    message: "Meeting schedule created successfully",
    meeting: savedMeetingSchedule
  });
});

// Get all meeting schedules
const getAllMeetingSchedules = TryCatch(async (req, res) => {
  const meetingSchedules = await MeetingSchedule.find().populate('meetings');
  res.status(200).json({
    success: true,
    message: "All meeting schedules retrieved successfully",
    meeting: meetingSchedules
  });
});

// Get a single meeting schedule by ID
const getMeetingScheduleById = TryCatch(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid meeting schedule ID format" });
  }
  const meetingSchedule = await MeetingSchedule.findById(id).populate('meetings');
  if (!meetingSchedule) {
    return res.status(404).json({ message: "Meeting schedule not found" });
  }
  res.status(200).json({
    success: true,
    message: "Meeting schedule retrieved successfully",
    meeting: meetingSchedule
  });
});

// Update a meeting schedule by ID
const updateMeetingSchedule = TryCatch(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid meeting schedule ID format" });
  }
  const updatedMeetingSchedule = await MeetingSchedule.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate('meetings');
  if (!updatedMeetingSchedule) {
    return res.status(404).json({ message: "Meeting schedule not found" });
  }
  res.status(200).json({
    success: true,
    message: "Meeting schedule updated successfully",
    meeting: updatedMeetingSchedule
  });
});

// Delete a meeting schedule by ID
const deleteMeetingSchedule = TryCatch(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid meeting schedule ID format" });
  }
  const deletedMeetingSchedule = await MeetingSchedule.findByIdAndDelete(id);
  if (!deletedMeetingSchedule) {
    return res.status(404).json({ message: "Meeting schedule not found" });
  }
  res.status(200).json({
    success: true,
    message: "Meeting schedule deleted successfully"
  });
});

module.exports = {
  createMeetingSchedule,
  getAllMeetingSchedules,
  getMeetingScheduleById,
  updateMeetingSchedule,
  deleteMeetingSchedule
};
