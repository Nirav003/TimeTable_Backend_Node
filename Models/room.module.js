const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    roomType: {
      type: String,
      enum: ['Classroom', 'Laboratory'],
      required: [true, "room type is required"],
    },
    floor: {
      type: Number,
      required: [true, "floor is required"],
    },
    room_no: {
      type: String,
      required: [true, "room_no is required"],
      unique: true,
    },
    dimensions: {
      type: String,
      required: [true, "dimensions are required"],
    }
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.models.Room || model("Room", schema);

module.exports = {
    Room
}