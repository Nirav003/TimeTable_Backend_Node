const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    stream: {
      type: String,
    },
    specialisation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Stream = mongoose.models.Stream || model("Stream", schema);

module.exports = {
    Stream
}