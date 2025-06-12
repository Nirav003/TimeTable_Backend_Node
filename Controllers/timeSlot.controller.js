const mongoose = require("mongoose");
const TimeSlot = require("../Models/timeSlot.module");
const Shift = require("../Models/shift.module");
const { TryCatch, ErrorHandler } = require("../Utils/utility");

//Get each & every slot
const getAllSlot = TryCatch(async (req, res, next) => {
  const slots = await TimeSlot.find().populate({
    path: 'Shift'
  });

  if (!slots) return next(new ErrorHandler("No slots found", 404));

  res.status(200).json({
    success: true,
    message: "Slots found successfully",
    slot: slots
  });
});

//create slot
const createSlot = TryCatch(async (req, res, next) => {
  const { shiftId, startTime, endTime } = req.body;

  if (!shiftId || !startTime || !endTime) {    
    return res.status(400).json({
      success: false,
      message: "Please provide required fields: Shift, startTime, endTime"
    });
  }

  // Validate that the Shift field is a valid ObjectId and exists
  const shiftExists = await Shift.findById(shiftId);
  if (!shiftExists) {
    return res.status(404).json({
      success: false,
      message: "Shift not found"
    });
  }

  // Create a new slot document
  const newSlot = new TimeSlot({
    Shift: shiftId,
    startTime,
    endTime
  });

  // Save the new slot to the database
  await newSlot.save();

  // Populate the Shift field in the response
  const populatedSlot = await newSlot.populate('Shift');
  
  res.status(201).json({
    success: true,
    message: "Slot created successfully",
    slot: populatedSlot
  });
});

//Get specific slot
const getSlotById = TryCatch(async (req, res, next) => {
  const slotId = req.params.id;

  if (!slotId) return next(new ErrorHandler("Slot ID is required", 400));

  const slot = await TimeSlot.findById(slotId).populate({
    path: 'Shift'
  });

  if (!slot) return next(new ErrorHandler("Slot not found", 404));

  res.status(200).json({
    success: true,
    message: "Slot found successfully",
    slot: slot
  });
});

//Delete slot
const deleteSlot = TryCatch(async (req, res, next) => {
  const slotId = req.params.id;

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(slotId)) return next(new ErrorHandler("Invalid slot ID format", 400));

  //Find slot & delete
  const result = await TimeSlot.findByIdAndDelete(slotId);
  if (!result) return next(new ErrorHandler("Slot not found", 404));

  res.status(200).json({
    success: true,
    message: "Slot deleted successfully"
  });
});

//Modify slot
const updateSlot = TryCatch(async (req, res, next) => {
  const slotId = req.params.id;
  const { Shift: shiftId, startTime, endTime } = req.body;

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(slotId)) return next(new ErrorHandler("Invalid slot ID format", 400));

  // Optionally validate the new Shift exists
  if (shiftId) {
    const shiftExists = await Shift.findById(shiftId);
    if (!shiftExists) {
      return res.status(404).json({
        success: false,
        message: "Shift not found"
      });
    }
  }

  // Build update object dynamically
  const updateObj = {};
  if (shiftId) updateObj.Shift = shiftId;
  if (startTime) updateObj.startTime = startTime;
  if (endTime) updateObj.endTime = endTime;

  const updatedSlot = await TimeSlot.findByIdAndUpdate(
    slotId,
    updateObj,
    { new: true, runValidators: true }
  ).populate({
    path: 'Shift'
  });

  if (!updatedSlot) return next(new ErrorHandler("TimeSlot not found", 404));

  res.status(200).json({
    success: true,
    message: "TimeSlot updated successfully",
    slot: updatedSlot
  });
});

//export the module
module.exports = {
  getAllSlot,
  createSlot,
  getSlotById,
  deleteSlot,
  updateSlot,
};
