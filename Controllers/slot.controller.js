const mongoose = require("mongoose");
const Slot = require("../Models/slot.module");
const { TryCatch, ErrorHandler } = require("../Utils/utility");

//Get each & every slot
const getAllSlot = TryCatch(async (req, res) => {

  const slots = await Slot.find();

  if(!slots) return next(new ErrorHandler("No slots found", 404));

  res.status(200).json({
   success: true,
    message: "Slots found successfully",
    slot: slots
  });

});

//create slot
const createSlot = TryCatch(async (req, res) => {
  const { slot } = req.body;

  // Create a new slot document
  const newSlot = new Slot({ slot });
  await newSlot.save();

  res.status(201).json({
    success: true,
    message: "Slot created successfully",
    slot: newSlot
  });
});

//Get specific slot
const getSlotById = TryCatch(async (req, res) => {

    const slotId = req.params.id;

    if (!slotId)  return  next(new ErrorHandler("Slot ID is required", 400));

    const slot = await Slot.findById(slotId);
    if (!slot)  return  next(new ErrorHandler("Slot not found", 404));

    res.status(200).json({
      success: true,
      message: "Slot found successfully",
      slot: slot
    });
  
});

//Delete slot
const deleteSlot = TryCatch(async (req, res) => {

    const slotId = req.params.id;

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(slotId)) return  next(new ErrorHandler("Invalid slot ID format", 400));

    //Find slot & delete
    const result = await Slot.findByIdAndDelete(slotId);
    if (!result)  return next(new ErrorHandler("Slot not found", 404));

    res.status(200).json({ 
      success: true,
      message: "Slot deleted successfully" 
    });
  
});

//Modify slot
const updateSlot = TryCatch(async (req, res) => {

    const slotId = req.params.id;
    const { slot } = req.body;

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(slotId)) return  next(new ErrorHandler("Invalid slot ID format", 400));


    // Validate the slot value
    if (typeof slot !== "number" || isNaN(slot))  return  next(new ErrorHandler("Slot must be a valid number", 400));

    const updatedSlot = await Slot.findByIdAndUpdate(
      slotId,
      { slot }, //value tobe updated
      { new: true, runValidators: true } //new: make sure value remains updated, rV:updated value is being cross verified with model
    );

    if (!updatedSlot) return  next(new ErrorHandler("Slot not found", 404)); //if any issue during above operation, 404 err

    res.status(200).json({
      success: true,
      message: "Slot updated successfully",
      slot: updatedSlot
    }); // or else updated successuffy
  
});

//export the module
module.exports = {
  getAllSlot,
  createSlot,
  getSlotById,
  deleteSlot,
  updateSlot,
};
