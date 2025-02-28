const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");


const schema = new Schema(
  {
    
    jsDate: {
      type: Date,
      required: true,
      trim: true
    },
    date: {
      type: String,
      required: true,
      trim: true
    },
    dayOfWeek: {
      type: String,
      required: true,
      trim: true
    },
    month: {
      type: String,
      required: true,
      trim: true
    },
    meetings:[{
      type: Schema.Types.ObjectId,
      ref: 'Meeting',
      default:[]
    }],
  },
  {
    timestamps: true,
  }
);

schema.index({
  date: 1
}, {
  unique: true
});

const MeetingSchedule = models.MeetingSchedule || model("MeetingSchedule", schema);

module.exports = {
    MeetingSchedule
}