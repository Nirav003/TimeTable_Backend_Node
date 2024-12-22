const { Professor } = require('../Models/professor.module.js');
const Stream = require('../Models/stream.module.js');
const { TryCatch, ErrorHandler } = require('../Utils/utility.js');

// Get all professor

const getAllProfessor = TryCatch( async (req, res, next) => {

    const professors = await Professor.find().populate({
        path: 'stream',
        populate: {
            path: 'year'
        }
    });

    if(!professors) return next(new ErrorHandler('Professors not found', 404));

    res.status(200).json({
        success: true,
        message: "Professors found successfully",
        professor: professors
    });

});

// Create a new professor

const createProfessor = TryCatch(async (req, res, next) => {

    const { name, designation, emailId, phoneNumber, streamId } = req.body;

    if(!name || !streamId || !designation || !emailId || !phoneNumber) return next(new ErrorHandler('All neccessory inputs are required', 400));

    const existingProfessor = await Professor.findOne({name});

    if(existingProfessor) return next(new ErrorHandler('Professor already exists', 400));

    const newProfessor = new Professor({name, designation, emailId, phoneNumber, stream: streamId});
    await newProfessor.save();

    const populatedProfessor = await Professor.findById(newProfessor._id).populate({
        path: 'stream',
        populate: {
            path: 'year'
        }
    });

    res.status(201).json({
        success: true,
        message: "Professor created successfully",
        professor: populatedProfessor
    });

});

// Get a single professor

const getProfessorById = TryCatch( async (req, res, next) => {

    const professorId = req.params.id;

    if(!professorId) return next(new ErrorHandler('Professor Id not found', 404));

    const professor = await Professor.findById(professorId).populate({
        path:'stream',
        populate: {
            path: 'year'
        }
    });

    if(!professor) return next(new ErrorHandler('Professor not found', 404));

    res.status(200).json({
        success: true,
        message: "Professor found successfully",
        professor: professor
    });

});

// Update a professor

const updateProfessor = TryCatch(async (req, res, next) => {

    const professorId = req.params.id;
    const { name, designation, emailId, phoneNumber, streamId } = req.body;

    if(!professorId) return next(new ErrorHandler('Professor Id not found', 404));

    // const streams = await Stream.findById(streamId);

    // if(!streams) return next(new ErrorHandler('Stream not found', 400));

    const updatedProfessor = await Professor.findByIdAndUpdate(professorId, { name, designation, emailId, phoneNumber, stream: streamId }, {new: true, runValidators: true}).populate({
        path:'stream',
        populate: {
            path: 'year'
        }
    });

    if(!updatedProfessor) return next(new ErrorHandler('Failed to update professor', 404));

    res.status(200).json({
        success: true,
        message: "Professor updated successfully",
        professor: updatedProfessor
    });

});

// Delete a professor

const deleteProfessor = TryCatch(async (req, res, next) => {

    const professorId = req.params.id;

    if(!professorId) return next(new ErrorHandler('Professor Id not found', 404));

    const deletedProfessor = await Professor.findByIdAndDelete(professorId).populate({
        path:'stream',
        populate: {
            path: 'year'
        }
    });

    if(!deletedProfessor) return next(new ErrorHandler('Failed to delete professor', 404));

    res.status(200).json({
        success: true,
        message: "Professor deleted successfully",
        deletedProfessor
    });

});

module.exports = {
    getAllProfessor,
    createProfessor,
    updateProfessor,
    getProfessorById, 
    deleteProfessor
}