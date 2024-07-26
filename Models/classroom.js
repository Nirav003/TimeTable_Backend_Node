const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    floor: {
      type: Integer,
    },
    room_no: {
      type: Integer,
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