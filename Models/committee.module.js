const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const schema = new Schema(
  {
    name: { 
        type: String, 
        required: [true, "committee name is required"] 
    },
    description: { 
        type: String,
        required: [true, "description is required"]
    },
    members: [{
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    }]
  },
  {
    timestamps: true,
  }
);

const Committee = mongoose.models.Committee || model("Committee", schema);

module.exports = Committee;
