const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    floor: {
      type: Number,
      required: [true, "floor is required"],
    },
    room_no: {
      type: Number,
      required: [true, "room_no is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Classroom = mongoose.models.Classroom || model("Classroom", schema);

module.exports = {
    Classroom
}