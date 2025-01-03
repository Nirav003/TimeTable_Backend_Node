const { ProfessorStreamMapping } = require("../Models/professorStream.module.js");
const { populate } = require("../Models/year.module.js");
const { TryCatch, ErrorHandler } = require("../Utils/utility");

// Get all professor-stream mappings
const getAllProfessorStreamMappings = TryCatch(async (req, res, next) => {

    const mappings = await ProfessorStreamMapping.find()
    .populate({
        path: 'professor',
    }) 
    .populate({
        path: 'stream',
        populate: {
            path: 'year',
            select: 'year',
        }
    });

    if(!mappings) return next(new ErrorHandler('Professor-stream mappings not found',400));

    res.status(200).json({
        success: true,
        message: "Mapping found successfully",
        mapping: mappings
    });

});

// Create a professor-stream mapping
const createProfessorStreamMapping = TryCatch(async (req, res, next) => {

    const { professor, stream } = req.body;

    if (!stream || !professor || !Array.isArray(stream)) {
        return res.status(400).json({
            success: false,
            message: 'Professor and streams are required, and streams must be an array',
        });
    }

    const mapping = await ProfessorStreamMapping.create({ professor, stream });

    res.status(201).json({
        success: true,
        message: "Mapping created successfully",
        mapping: mapping
    });

});

// Get a professor-stream mapping by professor ID
const getMappingByProfessorId = TryCatch(async (req, res, next) => {

    const professorId = req.params.id;

    if (!professorId)  return  next(new ErrorHandler("Professor ID is required", 400));

    const mapping = await ProfessorStreamMapping.findOne({ professor: professorId })
    .populate({
        path: 'professor',
    }) 
    .populate({
        path: 'stream',
        populate: {
            path: 'year',
            select: 'year',
        }
    });

    if(!mapping) return next(new ErrorHandler('Professor-stream mapping not found',400));

    res.status(200).json({
        success: true,
        message: "Mapping found successfully",
        mapping: mapping
    });

});

// Update a professor-stream mapping by professor ID

const updateMappingByProfessorId = TryCatch(async (req, res, next) => {

    const professorId = req.params.id;

    if (!professorId)  return  next(new ErrorHandler("Professor ID is required", 400));

    const { professor, stream } = req.body;

    if (!stream || !professor) {
        return res.status(400).json({
            success: false,
            message: 'Professsor or streams are required',
        });
    }

    const mapping = await ProfessorStreamMapping.findOneAndUpdate({ 
        professor: professorId 
    }, { 
        stream,
        professor 
    }, { 
        new: true
    })
    .populate({
        path: 'professor',
    }) 
    .populate({
        path: 'stream',
        populate: {
            path: 'year',
            select: 'year',
        }
    });

    if(!mapping) return next(new ErrorHandler('Professor-stream mapping not found',404));

    res.status(200).json({
        success: true,
        message: "Mapping updated successfully",
        mapping: mapping
    });

});

// Delete a professor-stream mapping by professor ID
const deleteMappingByProfessorId = TryCatch(async (req, res, next) => {

    const professorId = req.params.id;

    if (!professorId)  return  next(new ErrorHandler("Professor ID is required", 400));

    const mapping = await ProfessorStreamMapping.findOneAndDelete({ professor: professorId });

    if(!mapping) return next(new ErrorHandler('Professor-stream mapping not found',404));

    res.status(200).json({
        success: true,
        message: "Mapping deleted successfully",
        mapping: mapping
    });

});

module.exports = {
    getAllProfessorStreamMappings,
    createProfessorStreamMapping,
    getMappingByProfessorId,
    updateMappingByProfessorId,
    deleteMappingByProfessorId,
}