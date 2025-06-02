const { Room } = require('../Models/room.module.js');
const { TryCatch, ErrorHandler } = require('../Utils/utility.js')

// Add new Room
const createRoom = TryCatch( async (req, res, next) => {
    const { roomType, floor, room_no, dimensions } = req.body;

    if(!floor || !room_no || !roomType || !dimensions) return next(new ErrorHandler('Invalid input',400));

    const room = new Room({ roomType, floor, room_no, dimensions});
    await room.save();
    // console.log(room);
    res.status(200).json({
        success: true,
        message: "Room created successfully",
        room: room
    });
    res.status(422).json({
        success: false,
        message: err.message,
    });
});

// Fetch all rooms
const getAllRoom = TryCatch(async (req, res, next) => {
    const rooms = await Room.find();

    if(!rooms) return next(new ErrorHandler('Rooms not found',400));

    res.status(200).json({
        success: true,
        message: "Room found successfully",
        room: rooms
    });
});

// Find room by ID
const getRoomById = TryCatch(async (req, res, next) => {

    const roomId = req.params.id;

    if (!roomId) return next(new ErrorHandler('Room Id is not found', 404));

    const room = await Room.findById(roomId);
    
    res.status(200).json({
        success: true,
        message: "Room found successfully",
        room: room
    });
    
});

// Update a room
const updateRoom = TryCatch( async (req, res, next) => {
    const roomId = req.params.id;
    const data = req.body;

    const room = await Room.findByIdAndUpdate(roomId, data, {
        new: true,
        runValidators: true
    });
    
    if (!room) return next(new ErrorHandler('Rooms not found', 404));
    
    res.status(200).json({
        success: true,
        message: "Room updated successfully",
        room: room
    });

    res.status(422).json({ 
        success: false,
        message: err.message 
    });

});


// Delete a room
const deleteRoom = TryCatch( async (req, res, next) => {
    const roomId = req.params.id;

    const room = await Room.findByIdAndDelete(roomId);
    
    if (!room) return next(new ErrorHandler('Rooms not found', 404));
    
    res.status(200).json({
        success: true,
        message: "Room deleted successfully",
        room: room
    });
    res.status(422).json({ 
        success: false,
        message: err.message 
    });
    
});


module.exports = {
    createRoom,
    getAllRoom,
    getRoomById,
    updateRoom,
    deleteRoom
};
