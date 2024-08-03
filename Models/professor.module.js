const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    name:{
        type: String,
        required: true,
        unique: true,
    },
    stream: {
      type: Schema.Types.ObjectId,
      ref: 'Stream',
      required: true,
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
        type: Number,
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