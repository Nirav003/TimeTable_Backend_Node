const { StreamSubjectMapping } = require('../Models/streamSubject.module');
const { TryCatch } = require('../Utils/utility');

// Get all stream-subject mappings
const getAllMappings = TryCatch(async (req, res, next) => {
    
    const mappings = await StreamSubjectMapping.find()
    .populate({
        path: 'stream',
        populate: {
            path: 'year'
        }
    })
    .populate('subjects');
    
    res.status(200).json({
        success: true,
        message: 'Mappings found successfully',
        mapping: mappings,
    });

});

// Create a new stream-subject mapping
const createMapping = TryCatch(async (req, res, next) => {
    const { stream, subjects } = req.body;

    // Validate request body
    if (!stream || !subjects || !Array.isArray(subjects)) {
        return res.status(400).json({
            success: false,
            message: 'Stream and subjects are required, and subjects must be an array',
        });
    }

    const mapping = await StreamSubjectMapping.create({ stream, subjects });

    res.status(201).json({
        success: true,
        message: 'Mapping created successfully',
        mapping: mapping,
    });
});

// Get a stream-subject mapping by stream ID
const getMappingByStreamId = TryCatch(async (req, res, next) => {
    const streamId = req.params.id;
    const mapping = await StreamSubjectMapping.findOne({ stream: streamId })
    .populate('stream')
    .populate('subjects');    

    if (!mapping) {
        return res.status(404).json({
            success: false,
            message: 'Mapping not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Mapping found successfully',
        mapping,
    });
});

// Update a stream-subject mapping by stream ID
const updateMappingByStreamId = TryCatch(async (req, res, next) => {
    const streamId = req.params.id;
    const { stream, subjects } = req.body;

    const updatedMapping = await StreamSubjectMapping.findOneAndUpdate(
        { stream: streamId },
        { stream, subjects },
        { new: true, runValidators: true }
    ).populate('stream')
    .populate('subjects')

    if (!updatedMapping) {
        return res.status(404).json({
            success: false,
            message: 'Mapping not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Mapping updated successfully',
        mapping: updatedMapping,
    });
});

// Delete a stream-subject mapping by stream ID
const deleteMappingByStreamId = TryCatch(async (req, res, next) => {
    const { streamId } = req.params;

    const deletedMapping = await StreamSubjectMapping.findOneAndDelete({ stream: streamId });

    if (!deletedMapping) {
        return res.status(404).json({
            success: false,
            message: 'Mapping not found',
        });
    }

    res.status(204).json({
        success: true,
        message: 'Mapping deleted successfully',
    });
});

module.exports = {
    getAllMappings,
    createMapping,
    getMappingByStreamId,
    updateMappingByStreamId,
    deleteMappingByStreamId,
};
