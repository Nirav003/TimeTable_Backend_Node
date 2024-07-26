const mongoose = require('mongoose');
const Year = require('../Models/year');

//Get all the years
const getAllYear = async(req, res) => {
    try {
        const years = await Year.find();
        res.status(200).json(years);
    } 
    catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while fetching years" });
    }
}

//Get year by Id
const getYearById = async(req, res) => {
    try {
        const yearId = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(yearId)) {
          return res.status(400).json({ error: "Invalid year ID format" });
        }
    
        const year = await Year.findById(yearId);
        if (!year) {
          return res.status(404).json({ error: "Year not found" });
        }
    
        res.status(200).json(year);
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while fetching the year" });
      }
}

//Create a new year
const createYear = async(req, res) => {
    try {
        const { year } = req.body;
        const newYear = new Year({ year });
        await newYear.save();
        res.status(201).json(newYear);
      } catch (error) {
        console.error("Error details:", error);
        if (error.code === 11000) {
          return res.status(400).json({ error: "This year is already reserved" });
        }
        res.status(500).json({ error: "An error occurred while creating the year" });
      }
}

//Modify the year
const updateYear = async(req, res) => {
    try {
        const yearId = req.params.id;
        const { year } = req.body;
    
        if (!mongoose.Types.ObjectId.isValid(yearId)) {
          return res.status(400).json({ error: "Invalid year ID format" });
        }
    
        const updatedYear = await Year.findByIdAndUpdate(
          yearId,
          { year },
          { new: true, runValidators: true }
        );
    
        if (!updatedYear) {
          return res.status(404).json({ error: "Year not found" });
        }
    
        res.status(200).json(updatedYear);
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while updating the year" });
      }
}

//Delete the existing year
const deleteYear = async(req, res) => {
    try {
        const yearId = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(yearId)) {
          return res.status(400).json({ error: "Invalid year ID format" });
        }
    
        const result = await Year.findByIdAndDelete(yearId);
        if (!result) {
          return res.status(404).json({ error: "Year not found" });
        }
    
        res.status(200).json({ message: "Year deleted successfully" });
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while deleting the year" });
      }
}

//Exporting modules
module.exports = {
    getAllYear, createYear, getYearById,
    updateYear, deleteYear,

}