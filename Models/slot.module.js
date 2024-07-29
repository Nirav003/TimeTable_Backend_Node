const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

//Schema design
const slotSchema = new Schema(
  {
    slot: {
      type: Number,
      unique: [true, "This slot is already reserved"],
      required:[true, "Slot number is required"]
    },
  },
  {
    timestamps: true,
  }
);

//export the slot model
const Slot = models.Slot || model("Slot", slotSchema);

module.exports = Slot;