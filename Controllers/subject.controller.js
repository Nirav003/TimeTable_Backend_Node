const mongoose = require("mongoose");
const Subject = require("../Models/subject.module");
const { TryCatch } = require("../Utils/utility");

//Get all subjects
const getAllSubject = TryCatch(async (req, res) => {
  const subjects = await Subject.find();
  res.status(200).json({
    success: true,
    message: "Subjects fetched successfully",
    subject: subjects,
  });
});

//Get subject by id
const getSubjectById = TryCatch(async (req, res) => {

    const subjectId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({ error: "Invalid subject ID format" });
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.status(200).json({
      success: true,
      message: "Subject fetched successfully",
      subject: subject,
    });
    res
      .status(500)
      .json({ error: "An error occurred while fetching the subject" });
});

//Add Subject
const createSubject = TryCatch(async (req, res) => {
  const { name } = req.body;
  const newSubject = await Subject.create({ name });
  res.status(201).json({
    success: true,
    message: "Subject created successfully",
    subject: newSubject,
  });
});

//Modify subject
const updateSubject = TryCatch( async (req, res) => {
  
  const subjectId = req.params.id;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(subjectId)) {
    return res.status(400).json({ error: "Invalid subject ID format" });
  }

  const updatedSubject = await Subject.findByIdAndUpdate(
    subjectId,
    { name },
    { new: true, runValidators: true }
  );

  if (!updatedSubject) {
    return res.status(404).json({ error: "Subject not found" });
  }

  res.status(200).json({
    success: true,
    message: "Subject updated successfully",
    subject: updatedSubject,
  });

});

//Delete Subjects
const deleteSubject = TryCatch( async (req, res) => {
  
    const subjectId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({ error: "Invalid subject ID format" });
    }

    const result = await Subject.findByIdAndDelete(subjectId);
    if (!result) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.status(200).json({ 
      success: true,
      message: "Subject deleted successfully"
    });
}
);

//Export all the controllers
module.exports = {
  getAllSubject,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};
