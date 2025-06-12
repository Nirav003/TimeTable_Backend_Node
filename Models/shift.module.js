const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const shiftSchema = new Schema(
  {
    shiftNo: {
      type: String,
      required: [true, "Shift number is required"]
    },
    day: {
      type: String,
      required: [true, "Day required"],
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    startTime:{
      type: String,
      required: [true, "Start time required"]
    },
    endTime:{
      type: String,
      required: [true, "end time required"]
    },
    date: {
      type: Date,
      required: [true, "Date is required"]
    },
    stream: {
      type: Schema.Types.ObjectId,
      ref: 'Stream',
      required: [true, "Stream is required"]
    },
  },
  {
    timestamps: true,
  }
);

const Shift = models.Shift || model("Shift", shiftSchema);

module.exports = Shift;
