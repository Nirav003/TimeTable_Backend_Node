const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    division: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Division = mongoose.models.Division || model("Division", schema);

module.exports = {
    Division
}