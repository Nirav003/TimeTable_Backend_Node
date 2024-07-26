const mongoose = require('mongoose')
const Slot = require('../Models/slot');

//Get each & every slot
const getAllSlot = async(req, res) => {
    try {
        const slots = await Slot.find();
        res.status(200).json(slots);
      } catch (error) { 
        res.status(500).json({ error: "An error occurred while fetching slots" });
      }
}

//create slot
const createSlot = async(req, res) => {
    try{
        const { slot } = req.body;

        // Create a new slot document
        const newSlot = new Slot({ slot });
        await newSlot.save();

        res.status(201).json(newSlot);

    }catch (error) {
        if (error.code === 11000) {
            // Duplicate slot error
            return res.status(400).json({ error: "This slot is already reserved" });
          }
        res.status(500).json({ error: "An error occurred while creating the slot" });
        console.log(error);
    }

    
};

//Get specific slot
const getSlotById = async(req, res) => {
    try {
        const slotId = req.params.id;
        if (!slotId) {
          return res.status(400).json({ error: "Slot ID is required" });
        }
    
        const slot = await Slot.findById(slotId);
        if (!slot) {
          return res.status(404).json({ error: "Slot not found" });
        }
    
        res.status(200).json(slot);
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while fetching the slot" });
      }
}

//Delete slot
const deleteSlot = async(req, res) => {
    try {
        const slotId = req.params.id;
    
        // Validate the ObjectId format
        if (!mongoose.Types.ObjectId.isValid(slotId)) {
          return res.status(400).json({ error: "Invalid slot ID format" });
        }
        
        //Find slot & delete
        const result = await Slot.findByIdAndDelete(slotId);
        if (!result) {
          return res.status(404).json({ error: "Slot not found" });
        }
    
        res.status(200).json({ message: "Slot deleted successfully" });
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while deleting the slot" });
        //console.log(error);
    }
}

//Modify slot
const updateSlot = async(req, res) => {

    try {
        const slotId = req.params.id;
        const { slot } = req.body;
    
        // Validate the ObjectId format
        if (!mongoose.Types.ObjectId.isValid(slotId)) {
          return res.status(400).json({ error: "Invalid slot ID format" });
        }
    
        // Validate the slot value
        if (typeof slot !== 'number' || isNaN(slot)) {
          return res.status(400).json({ error: "Slot must be a valid number" });
        }
    
        const updatedSlot = await Slot.findByIdAndUpdate(
           slotId,
          { slot }, //value tobe updated
          { new: true, runValidators: true }//new: make sure value remains updated, rV:updated value is being cross verified with model
        );
    
        if (!updatedSlot) {
          return res.status(404).json({ error: "Slot not found" });//if any issue during above operation, 404 err
        }
    
        res.status(200).json(updatedSlot);// or else updated successuffy
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while updating the slot" });
        //console.log(error)
      }
}

//export the module
module.exports={
    getAllSlot, createSlot, 
    getSlotById, deleteSlot,
    updateSlot
}