const mongoose = require("mongoose");
const Meeting = require("../Models/meeting.module");
const { TryCatch, ErrorHandler } = require("../Utils/utility");

// Create a new meeting
const createMeeting = TryCatch(async (req, res) => {
    const { title, description, committee, participants, createdBy, meetingLink } = req.body;
  const meeting = new Meeting({ title, description, committee, participants, createdBy, meetingLink });
  const savedMeeting = await meeting.save();
  res.status(201).json({
    success: true,
    message: "Meeting created successfully",
    meeting: savedMeeting
  });
});

// Get all meetings
const getAllMeetings = TryCatch(async (req, res) => {
  const meetings = await Meeting.find().populate([
    {
        path: 'committee'
    },
    {
        path: 'participants'
    },
    {
        path: 'createdBy'
    },
    ]);
  res.status(200).json({
    success: true,
    meeting: meetings
  });
});

// Get a single meeting by ID
const getMeetingById = TryCatch(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid meeting ID format" });
  }
  const meeting = await Meeting.findById(id).populate([
    {
        path: 'committee'
    },
    {
        path: 'participants'
    },
    {
        path: 'createdBy'
    },
    ]);
  if (!meeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }
  res.status(200).json({
    success: true,
    meeting: meeting
  });
});

// Update a meeting by ID
const updateMeeting = TryCatch(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid meeting ID format" });
  }
  const updatedMeeting = await Meeting.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate([
    {
        path: 'committee'
    },
    {
        path: 'participants'
    },
    {
        path: 'createdBy'
    },
    ]);
  if (!updatedMeeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }
  res.status(200).json({
    success: true,
    message: "Meeting updated successfully",
    meeting: updatedMeeting
  });
});

// Delete a meeting by ID
const deleteMeeting = TryCatch(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid meeting ID format" });
  }
  const deletedMeeting = await Meeting.findByIdAndDelete(id);
  if (!deletedMeeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }
  res.status(200).json({
    success: true,
    message: "Meeting deleted successfully"
  });
});

module.exports = {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting
};
