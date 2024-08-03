const { Classroom } = require('../Models/classroom.module.js');
const { TryCatch, ErrorHandler } = require('../Utils/utility.js')

// Add new classroom
const createClassroom = TryCatch( async (req, res, next) => {
    const { floor, room_no } = req.body;

    if(!floor || !room_no) return next(new ErrorHandler('Invalid input',400));

    const classroom = new Classroom({ floor, room_no});
    await classroom.save();
    console.log(classroom);
    res.status(200).json({
        success: true,
        message: "Classroom created successfully",
        classroom
    });
    res.status(422).json({
        success: false,
        message: err.message,
    });
});

// Fetch all classrooms
const getAllClassroom = TryCatch(async (req, res, next) => {
    const classrooms = await Classroom.find();

    if(!classrooms) return next(new ErrorHandler('Classrooms not found',400));

    res.status(200).json({
        success: true,
        message: "Classroom found successfully",
        classrooms
    });
});

// Find classroom by ID
const getClassroomById = TryCatch(async (req, res, next) => {

    const classroomId = req.params.id;

    if (!classroomId) return next(new ErrorHandler('Classroom Id is not found', 404));

    const classroom = await Classroom.findById(classroomId);
    
    res.status(200).json({
        success: true,
        message: "Classroom found successfully",
        classroom
    });
    
});

// Update a classroom
const updateClassroom = TryCatch( async (req, res, next) => {
    const classroomId = req.params.id;
    const data = req.body;

    const classroom = await Classroom.findByIdAndUpdate(classroomId, data, {
        new: true,
        runValidators: true
    });
    
    if (!classroom) return next(new ErrorHandler('Classrooms not found', 404));
    
    res.status(200).json({
        success: true,
        message: "Classroom updated successfully",
        classroom
    });

    res.status(422).json({ 
        success: false,
        message: err.message 
    });

});


// Delete a classroom
const deleteClassroom = TryCatch( async (req, res, next) => {
    const classroomId = req.params.id;

    const classroom = await Classroom.findByIdAndDelete(classroomId);
    
    if (!classroom) return next(new ErrorHandler('Classrooms not found', 404));
    
    res.status(200).json({
        success: true,
        message: "Classroom deleted successfully",
        classroom
    });
    res.status(422).json({ 
        success: false,
        message: err.message 
    });
    
});


module.exports = {
    createClassroom,
    getAllClassroom,
    getClassroomById,
    updateClassroom,
    deleteClassroom
};
