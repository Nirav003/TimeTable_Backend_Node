const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    lectureType: {
        type: String,
        required: [true, "LectureType is required"],
        enum: ["Theory", "Practical", "Guest Lecture"],
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: [true, "Subject is required"],
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "Room is required"],
    },
    professor: { 
        type: Schema.Types.ObjectId, 
        ref: "Professor",
        required: [true, "Professor is required"],
    },
    division: {
        type: Schema.Types.ObjectId,
        ref: "Division",
    },
  },
  {
    timestamps: true,
  }
);

const Lecture = mongoose.models.Lecture || model("Lecture", schema);

module.exports = {
    Lecture
}