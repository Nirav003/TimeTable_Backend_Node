const { Stream } = require("../Models/stream.module.js");
const Year = require("../Models/year.module.js");
const { TryCatch, ErrorHandler } = require('../Utils/utility.js');

// Get all the streams

const getAllStreams = TryCatch(async (req, res, next) => {
  
    const streams = await Stream.find().populate('year');
  
    if(!streams) return next(new ErrorHandler('Streams not found',400));

    res.status(200).json({
        success: true,
        message: "Streams found successfully",
        Stream: streams
    });

});

// create a stream

const createStream = TryCatch(async (req, res, next) => {

    const { name, specialisation, yearId } = req.body;

    const year = await Year.findById(yearId);

    if(!year) return next(new ErrorHandler('Year not found',404));

    const newStream = new Stream({ name, specialisation, year: yearId });
    await newStream.save();

    const stream = await newStream.populate('year');

    res.status(201).json({
        success: true,
        message: "Stream created successfully",
        stream: stream
    });

});

// get a single stream

const getStreamById = TryCatch(async (req, res, next) => {

    const streamId = req.params.id;

    const stream = await Stream.findById(streamId).populate('year');

    if(!stream) return next(new ErrorHandler('Stream not found',404));

    res.status(200).json({
        success: true,
        message: "Stream found successfully",
        stream: stream
    });

});

// update a stream

const updateStream = TryCatch(async (req, res, next) => {

    const streamId = req.params.id;
    const {name, specialisation, yearId} = req.body;

    const year = await Year.findById(yearId);

    if(!year) return next(new ErrorHandler('Year not found'), 404);

    const stream = await Stream.findByIdAndUpdate(streamId, { name, specialisation, year: yearId }, { new: true, runValidators: true }).populate('year');

    if(!stream) return next(new ErrorHandler('Stream not found',404));

    res.status(200).json({
        success: true,
        message: "Stream updated successfully",
        stream: stream
    });

});

// delete a stream

const deleteStream = TryCatch(async (req, res, next) => {

    const streamId = req.params.id;

    const stream = await Stream.findByIdAndDelete(streamId);

    if(!stream) return next(new ErrorHandler('Stream not found',404));

    res.status(200).json({
        success: true,
        message: "Stream deleted successfully",
        stream: stream
    });

});

module.exports = {
    getAllStreams,
    createStream,
    getStreamById,
    updateStream,
    deleteStream
};