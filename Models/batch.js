const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    year: {
      type: Schema.Types.ObjectId,
      ref: "Year",
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

const Batch = mongoose.models.Batch || model("Batch", schema);

module.exports = {
    Batch
}