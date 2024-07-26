const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    Subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
    },
    Calendar: {
        type: Schema.Types.ObjectId,
        ref: "Calendar",
    },
    Classroom: {
        type: Schema.Types.ObjectId,
        ref: "Classroom",
    },
    Professor: { 
        type: Schema.Types.ObjectId, 
        ref: "Professor",
    },
    Slot: {
        type: Schema.Types.ObjectId,
        ref: "Slot",
    },
    Batch: {
        type: Schema.Types.ObjectId,
        ref: "Batch",
    },
    Division: {
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