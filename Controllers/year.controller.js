const mongoose = require("mongoose");
const Year = require("../Models/year.module");
const { TryCatch } = require("../Utils/utility");

//Get all the years
const getAllYear = TryCatch(async (req, res) => {
  const years = await Year.find();
  res.status(200).json({
    success: true,
    message: "Subjects fetched successfully",
    years: years,
  });
});

//Get year by Id
const getYearById = TryCatch(async (req, res) => {
  const yearId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(yearId)) {
    return res.status(400).json({ error: "Invalid year ID format" });
  }

  const year = await Year.findById(yearId);
  if (!year) {
    return res.status(404).json({ error: "Year not found" });
  }

  res.status(200).json(year);
});

//Create a new year
const createYear = TryCatch(async (req, res) => {
  const { year } = req.body;
  const newYear = new Year({ year });
  await newYear.save();
  res.status(201).json(newYear);
});

//Modify the year
const updateYear = TryCatch(async (req, res) => {
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
});

//Delete the existing year
const deleteYear = TryCatch(async (req, res) => {
  const yearId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(yearId)) {
    return res.status(400).json({ error: "Invalid year ID format" });
  }

  const result = await Year.findByIdAndDelete(yearId);
  if (!result) {
    return res.status(404).json({ error: "Year not found" });
  }

  res.status(200).json({ message: "Year deleted successfully" });
});

//Exporting modules
module.exports = {
  getAllYear,
  createYear,
  getYearById,
  updateYear,
  deleteYear,
};
