const mongoose = require("mongoose");
const Shift = require("../Models/shift.module");
const Stream = require("../Models/stream.module")
const { TryCatch } = require("../Utils/utility");
const moment = require("moment");

//get all shifts
const getAllShifts = TryCatch(async (req, res) => {
  // Fetch all shift documents from the database
  const shifts = await Shift.find().populate({ 
    path: "stream",
    populate: {
      path: "year" 
    }
  });

  // If no shifts are found, send a 404 response
  if (shifts.length === 0) {
    return res.status(404).json({ message: "No shifts found" });
  }

  res.status(200).json({
    success: true,
    message: "Shifts found successfully",
    shift: shifts
  });
});

//get shift by id
const getShiftById = TryCatch(async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Shift ID" });
  }

  // Fetch the shift document from the database by ID
  const shift = await Shift.findById(id).populate("stream");

  // If no shift is found, send a 404 response
  if (!shift) {
    return res.status(404).json({ message: "Shift not found" });
  }

  // If shift is found, send it in the response
  res.status(200).json({
    success: true,
    message: "Shift found successfully",
    shift: shift,
  });
});


//create shifts
const createShift = TryCatch(async (req, res) => {
  const { shiftNo, day, date, startTime, endTime, stream } = req.body;

  // console.log(req.body);
  
  // Validate the input
  if (!shiftNo || !day || !date || !startTime || !endTime || !stream) {
    return res
      .status(400)
      .json({ error: "Please provide all neccessary information" });
  }

  // Validate if the provided stream exists
  const existingStream = await Stream.findById(stream);
  if (!existingStream) {
    return res.status(400).json({ error: "Invalid Stream ID" });
  }

  const FormatedDate = moment(date).format("DD/MM/YYYY");
  
  // Create a new shift
  const newShift = new Shift({
    shiftNo,
    date: FormatedDate,
    day,
    startTime,
    endTime,
    stream
  });

  // Save the shift to the database
  const savedShift = await newShift.save();

  // Populate the stream field after saving
  const populatedShift = await Shift.findById(savedShift._id).populate("stream");

  res.status(201).json({
    success: true,
    message: "Shift created successfully",
    shift: populatedShift,
  });
});

const updateShift = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { shiftNo, day, date, startTime, endTime, stream } = req.body;

  // Validate the ID
  if (timeSlot && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Shift ID" });
  }

  // Build the update object
  const updateData = {};
  if (shiftNo) updateData.shiftNo = shiftNo;
  if (day) updateData.day = day;
  if (date) updateData.date = date;
  if (startTime) updateData.startTime = startTime;
  if (endTime) updateData.endTime = endTime;
  if (stream) updateData.stream = stream;

  // Find the shift by ID and update it with the provided data
  const updatedShift = await Shift.findByIdAndUpdate(id, updateData, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validations are run
  }).populate("stream");

  // If no shift is found, send a 404 response
  if (!updatedShift) {
    return res.status(404).json({ message: "Shift not found" });
  }

  // If shift is updated successfully, return the updated document
  res.status(200).json({
    success: true,
    message: "Shift updated successfully",
    shift: updatedShift,
  });
});

const deleteShift = TryCatch(async (req, res) => {
  const { id } = req.params;

  // Check if the ID is provided
  if (!id) {
    return res.status(400).json({ error: "Please provide the shift ID" });
  }

  // Find and delete the shift
  const result = await Shift.findByIdAndDelete(id);

  // If no shift is found, send a 404 response
  if (!result) {
    return res.status(404).json({ message: "Shift not found" });
  }

  res.status(200).json({ 
    success: true,
    message: "Shift deleted successfully"
  });
});



module.exports = {
  getAllShifts,
  getShiftById,
  createShift,
  updateShift,
  deleteShift
};
