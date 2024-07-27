const mongoose = require('mongoose');
const Subject = require('../Models/subject');

//Get all subjects
const getAllSubject = async(req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while fetching subjects" });
      }
}

//Get subject by id
const getSubjectById = async(req, res) => {
    try {
        const subjectId = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
          return res.status(400).json({ error: "Invalid subject ID format" });
        }
    
        const subject = await Subject.findById(subjectId);
        if (!subject) {
          return res.status(404).json({ error: "Subject not found" });
        }
    
        res.status(200).json(subject);
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while fetching the subject" });
      }
}

//Add Subject
const createSubject = async(req, res) => {
    try {
        const { name } = req.body;
        const newSubject = new Subject({ name });
        await newSubject.save();
        res.status(201).json(newSubject);
      } catch (error) {
        console.error("Error details:", error);
        if (error.code === 11000) {
          return res.status(400).json({ error: "This subject is already reserved" });
        }
        res.status(500).json({ error: "An error occurred while creating the subject" });
        console.log(error)
      }
}

//Modify subject
const updateSubject = async(req, res) => {
    try {
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
    
        res.status(200).json(updatedSubject);
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while updating the subject" });
      }
}

//Delete Subjects
const deleteSubject = async(req, res) => {
    try {
        const subjectId = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
          return res.status(400).json({ error: "Invalid subject ID format" });
        }
    
        const result = await Subject.findByIdAndDelete(subjectId);
        if (!result) {
          return res.status(404).json({ error: "Subject not found" });
        }
    
        res.status(200).json({ message: "Subject deleted successfully" });
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while deleting the subject" });
      }
}

//Export all the controllers
module.exports = {
    getAllSubject, getSubjectById,
    createSubject, updateSubject,
    deleteSubject
}