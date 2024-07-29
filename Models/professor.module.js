const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    name:{
        type: String,
        required: true,
    },
    subjects: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
    designation: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Integer,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Professor = mongoose.models.Professor || model("Professor", schema);

module.exports = {
    Professor
}