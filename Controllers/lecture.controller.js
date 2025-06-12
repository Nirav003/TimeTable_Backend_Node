const mongoose = require('mongoose');
const { Lecture } = require('../Models/lecture.module.js');
const MaxLecturesPerDay = require('../Models/MaxLecturesPerDay.module.js');
const { TryCatch, ErrorHandler } = require('../Utils/utility.js');

// Create a new lecture

const createLecture = TryCatch(async (req, res, next) => {

    const { lectureType, subject, room, professor, division, stream, timeSlot } = req.body;

    // Validate ObjectIds
    if(
        !mongoose.Types.ObjectId.isValid(subject)
    ) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid ObjectId format for subject'
        });
    }
    if(
        !mongoose.Types.ObjectId.isValid(room)
    ) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid ObjectId format for room'
        });
    }
    if(
        !mongoose.Types.ObjectId.isValid(professor)
    ) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid ObjectId format for professor'
        });
    }
    if(
        !mongoose.Types.ObjectId.isValid(stream)
    ) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid ObjectId format for stream'
        });
    }
    if(
        !mongoose.Types.ObjectId.isValid(timeSlot)
    ) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid ObjectId format for timeSlot'
        });
    }

    if(division && !mongoose.Types.ObjectId.isValid(division)) {
        return res.status(400).json({ 
            success: false,
            message: 'Invalid ObjectId format for division'
        });
    }

    if(!lectureType || !subject || !room || !professor || !stream || !timeSlot) {
        return next(new ErrorHandler('Please provide all the necessary details',400));
    }

    // Check if the professor has reached the maximum number of lectures per day
    const maxLecturesPerDay = await MaxLecturesPerDay.findOne({ professorId: professor });
    if (maxLecturesPerDay) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lecturesToday = await Lecture.countDocuments({
            professor: professor,
            createdAt: { $gte: today }
        });
        if (lecturesToday >= maxLecturesPerDay.maxLectures) {
            return res.status(400).json({
                success: false,
                message: 'Professor has reached the maximum number of lectures for today'
            });
        }
    }

    const lecture = new Lecture({ lectureType, subject, room, professor, division, stream, timeSlot });
    
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
    .populate('division')
    .populate({
        path: 'stream',
        populate: { path: 'year' } // populate year inside stream
    })
    .populate('timeSlot');

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
    .populate('division')
    .populate({
        path: 'stream',
        populate: { path: 'year' } 
    })
    .populate('timeSlot');

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
    const { lectureType, subject, room, professor, division, stream, timeSlot } = req.body;

    if(!lectureId) return next(new ErrorHandler('Lecture ID not found',404));

    // Validate ObjectIds if provided
    if(subject && !mongoose.Types.ObjectId.isValid(subject)) {
        return res.status(400).json({ success: false, message: 'Invalid ObjectId format for subject' });
    }
    if(room && !mongoose.Types.ObjectId.isValid(room)) {
        return res.status(400).json({ success: false, message: 'Invalid ObjectId format for room' });
    }
    if(professor && !mongoose.Types.ObjectId.isValid(professor)) {
        return res.status(400).json({ success: false, message: 'Invalid ObjectId format for professor' });
    }
    if(stream && !mongoose.Types.ObjectId.isValid(stream)) {
        return res.status(400).json({ success: false, message: 'Invalid ObjectId format for stream' });
    }
    if(timeSlot && !mongoose.Types.ObjectId.isValid(timeSlot)) {
        return res.status(400).json({ success: false, message: 'Invalid ObjectId format for timeslot' });
    }
    if(division && !mongoose.Types.ObjectId.isValid(division)) {
        return res.status(400).json({ success: false, message: 'Invalid ObjectId format for division' });
    }

    const updateObj = {};
    if(lectureType) updateObj.lectureType = lectureType;
    if(subject) updateObj.subject = subject;
    if(room) updateObj.room = room;
    if(professor) updateObj.professor = professor;
    if(division !== undefined) updateObj.division = division;
    if(stream) updateObj.stream = stream;
    if(timeSlot) updateObj.timeSlot = timeSlot;
    
    const lecture = await Lecture.findByIdAndUpdate(lectureId, updateObj, { new: true, runValidators: true })
    .populate('subject')
    .populate('room')
    .populate('professor')
    .populate('division')
    .populate('timeSlot')
    .populate({
        path: 'stream',
        populate: { path: 'year' } 
    });
    
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
    .populate('division')
    .populate({
        path: 'stream',
        populate: { path: 'year' } 
    })
    .populate('timeSlot');

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
