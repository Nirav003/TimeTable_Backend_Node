const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");


const streamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    specialisation: {
        type: String,
        required: true,
    },
    year: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year',
        required: true,
    }
},{
  timestamps: true,
}
);

streamSchema.index({ 
    specialisation: 1,
    year: 1
},{
    unique: true
});

const Stream = mongoose.models.Stream || model('Stream', streamSchema);

module.exports = Stream;