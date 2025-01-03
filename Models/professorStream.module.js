const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const schema = new Schema({
    professor: {
        type: Schema.Types.ObjectId,
        ref: 'Professor',
        required: true
    },
    stream: [{
        type: Schema.Types.ObjectId,
        ref: 'Stream',
        required: true
    }]
});

const ProfessorStreamMapping = models.ProfessorStreamMapping || model('ProfessorStreamMapping', schema);

module.exports = {
    ProfessorStreamMapping
};