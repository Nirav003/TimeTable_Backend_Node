const mongoose = require('mongoose');
const { Lecture } = require('../Models/lecture.module.js');
const { TryCatch, ErrorHandler } = require('../Utils/utility.js');

// Create a new lecture

const createLecture = TryCatch(async (req, res, next) => {

    const { lectureType, subject, room, professor, division } = req.body;

    if(!mongoose.Types.ObjectId.isValid(subject) || !mongoose.Types.ObjectId.isValid(room) || !mongoose.Types.ObjectId.isValid(professor)) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid ObjectId format'
        });
    }

    if(division) {
        if(!mongoose.Types.ObjectId.isValid(division)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid ObjectId format for division'
            });
        }
    }

    if(!lectureType || !subject || !room || !professor) return next(new ErrorHandler('Please provide all the necessary details',400));

    const lecture = new Lecture(req.body);
    
    await lecture.save();
    res.status(200).json({
        success: true,
        message: 'Lecture created successfully',
        lecture: lecture
    });

});

// Fetch all lectures

const getAllLectures = TryCatch(async (req, res, next) => {

    const lectures = await Lecture.find()
    .populate('subject')
    .populate('room')
    .populate('professor')
    .populate('division');

    if(!lectures) return next(new ErrorHandler('Lectures not found',400));

    res.status(200).json({
        success: true,
        message: 'Lectures found successfully',
        lecture: lectures
    });

});

// Fetch lecture by ID

const getLectureById = TryCatch(async (req, res, next) => {

    const lectureId = req.params.id;

    if(!lectureId) return next(new ErrorHandler('Lecture ID not found',404));

    const lecture = await Lecture.findById(lectureId)
    .populate('subject')
    .populate('room')
    .populate('professor')
    .populate('division');

    if(!lecture) return next(new ErrorHandler('Lecture not found',404));

    res.status(200).json({
        success: true,
        message: 'Lecture found successfully',
        lecture: lecture
    });

});

// Update lecture by ID

const updateLecture = TryCatch(async (req, res, next) => {

    const lectureId = req.params.id;
    const { lectureType, subject, room, professor, division } = req.body;

    if(!lectureId) return next(new ErrorHandler('Lecture ID not found',404));

    const lecture = await Lecture.findByIdAndUpdate(lectureId, { lectureType, subject, room, professor, division }, { new: true, runValidators: true })
    .populate('subject')
    .populate('room')
    .populate('professor')
    .populate('division');

    if(!lecture) return next(new ErrorHandler('Lecture not found',404));

    res.status(200).json({
        success: true,
        message: 'Lecture updated successfully',
        lecture: lecture
    });

});

// Delete lecture by ID

const deleteLecture = TryCatch(async (req, res, next) => {

    const lectureId = req.params.id;

    if(!lectureId) return next(new ErrorHandler('Lecture ID not found',404));

    const lecture = await Lecture.findByIdAndDelete(lectureId)
    .populate('subject')
    .populate('room')
    .populate('professor')
    .populate('division');

    if(!lecture) return next(new ErrorHandler('Lecture not found',404));

    res.status(200).json({
        success: true,
        message: 'Lecture deleted successfully',
        lecture: lecture
    });

});


module.exports = {
    createLecture,
    getAllLectures,
    getLectureById,
    updateLecture,
    deleteLecture
};
