const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    year: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Year = mongoose.models.Year || model("Year", schema);

module.exports = {
    Year
}