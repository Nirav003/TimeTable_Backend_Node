const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    day: {
      type: String,
      required: true,
    },
    date: {
      type: Integer,
      required: true,
    },
    month: {
      type: String,
      required: true,
      unique: true,
    },
    year: {
      type: Integer,
      required: true,    
    },
  },
  {
    timestamps: true,
  }
);

const Calendar = mongoose.models.Calendar || model("Calendar", schema);

module.exports = {
    Calendar
}