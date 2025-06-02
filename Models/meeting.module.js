const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    title: { 
        type: String, 
        required: [true, "Title is required"] 
    },
    description: { 
        type: String,
        required: [true, "Description is required"]
    },
    type: { 
        type: String, 
        enum: ['Regular', 'Ad-hoc'], 
        required: [true, "Type is required"]
    },
    committee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Committee' 
    },
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    reminderFrequency: {
        type: String, 
        enum: ['Once', 'Daily', 'Weekly', 'Custom'], 
        default: 'Once' 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    meetingLink: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.models.Meeting || model("Meeting", schema);

module.exports = Meeting;
