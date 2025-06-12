const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

//Schema design
const timeSlotSchema = new Schema(
  {
    Shift: {
      type: Schema.Types.ObjectId,
      ref: 'Shift',
      required: [true, "lecture object required"]
    },
    startTime: {
      type: String,
      required: [true, "start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "end time is required"],
    },
  },
  {
    timestamps: true,
  }
);

//export the slot model
const TimeSlot = models.TimeSlot || model("TimeSlot", timeSlotSchema);

module.exports = TimeSlot;