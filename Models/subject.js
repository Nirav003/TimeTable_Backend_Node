const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stream: {
      type: Schema.Types.ObjectId,
      ref: "Stream",
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.models.Subject || model("Subject", schema);

module.exports = {
    Subject
}