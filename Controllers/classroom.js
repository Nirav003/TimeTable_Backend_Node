const mongoose = require('mongoose');
const Classroom = require('../Models/classroom.js');
const { TryCatch, ErrorHandler } = require('../Utils/utility.js')

// Add new classroom
const createClassroom = TryCatch( async (req, res, next) => {
    const { floor, room_no } = req.body;

    if(!floor || !room_no) return (new ErrorHandler('Invalid input',400));

    const classroom = new Classroom({ floor, room_no});
    await classroom.save();
    console.log(classroom);
    res.status(200).json({
        message: "Classroom created successfully",
        classroom
    });
    res.status(422).json({ message: err.message });
});

// Fetch all classrooms
const getAllClassroom = TryCatch(async (req, res, next) => {
    const classrooms = await Classroom.find();

    if(!classrooms) return (new ErrorHandler('Classrooms not found',400));

    res.status(200).json({
        message: "Classroom found successfully",
        classrooms
    });
});

// Find classroom by ID
const getClassroomById = TryCatch(async (req, res, next) => {

    const { id } = req.params.classroomId;

    const classroom = await Classroom.findOne({ id: id });
    
    if (!classroom) return (new ErrorHandler('Classrooms not found', 404));
    
    res.status(200).json({
        message: "Classroom found successfully",
        classroom
    });
    res.status(400).json({ message: err.message });
});

// Update a classroom
const updateClassroom = TryCatch( async (req, res, next) => {
    const { id } = req.params.classroomId;
    const data = req.body;

    const classroom = await Classroom.findOneAndUpdate({ id: id }, data, { new: true });
    
    if (!classroom) return (new ErrorHandler('Classrooms not found', 404));
    
    res.status(200).json({
        message: "Classroom updated successfully",
        classroom
    });
    res.status(422).json({ message: err.message });
} )


// Delete a classroom
const deleteClassroom = TryCatch( async (req, res, next) => {
    const { id } = req.params.classroomId;

    const classroom = await Classroom.findOneAndDelete({ id: id });
    
    if (!classroom) return (new ErrorHandler('Classrooms not found', 404));
    
    res.status(200).json({
        message: "Classroom deleted successfully",
        classroom
    });
    res.status(422).json({ message: err.message });
})


module.exports = {
    createClassroom,
    getAllClassroom,
    getClassroomById,
    updateClassroom,
    deleteClassroom
};
