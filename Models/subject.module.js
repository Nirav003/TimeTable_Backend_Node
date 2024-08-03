const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

//Schema design
const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "subject name is required"],
      unique: [true, "subject already exists"],
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

const Subject = models.Subject || model("Subject", subjectSchema);

module.exports = Subject;