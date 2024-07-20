const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    slot: {
      type: Integer,
    },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.models.Slot || model("Slot", schema);

module.exports = {
    Slot
}