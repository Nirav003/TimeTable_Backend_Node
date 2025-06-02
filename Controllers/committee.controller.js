const { default: mongoose } = require("mongoose");
const Committee = require("../Models/committee.module.js");
const { TryCatch } = require("../Utils/utility.js");

// Create Committee
const createCommittee = TryCatch (async (req, res) => {
  
    const { name, description } = req.body;

    if(!description || !name) {
        return res.status(400).json({ message: "Invalid input." });
    }

    const committeeExists = await Committee.findOne({ name });
    if (committeeExists) return res.status(400).json({ message: "Committee already exists." });

    const committee = new Committee({ name, description });
    await committee.save();

    res.status(201).json({ 
        success: true, 
        message: "Committee created successfully.", 
        committee: committee  
    });
  
});

// Update Committee
const updateCommittee = TryCatch(async (req, res) => {
  
    const { id } = req.params;
    const { name, description } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format." });
    }

    if(!description || !name) {
        return res.status(400).json({ message: "Invalid input." });
    }

    const committee = await Committee.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!committee) return res.status(404).json({ message: "Committee not found." });

    res.status(200).json({ 
        success: true,
        message: "Committee updated successfully.", 
        committee: committee 
    });
  
});

// Delete Committee
const deleteCommittee = TryCatch(async (req, res) => {
    
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format." });
    }

    const committee = await Committee.findByIdAndDelete(id);
    if (!committee) return res.status(404).json({ message: "Committee not found." });

    res.status(200).json({ 
        success: true,
        message: "Committee deleted successfully." 
    });
  
});

// Get All Committees
const getAllCommittee = TryCatch (async (req, res) => {
    const committees = await Committee.find();
    res.status(200).json({
        success: true,
        message: "Committees fetched successfully.",    
        committee: committees
    });
  
});

// Get Committee by ID

const getCommitteeById = TryCatch (async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format." });
    }

    const committee = await Committee.findById(id);
    if (!committee) return res.status(404).json({ message: "Committee not found." });

    res.status(200).json({
        success: true,
        message: "Committee fetched successfully.",
        committee: committee
    });
  
});

module.exports = { 
    createCommittee, 
    updateCommittee, 
    deleteCommittee, 
    getAllCommittee, 
    getCommitteeById 
};