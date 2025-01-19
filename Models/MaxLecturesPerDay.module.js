const mongoose = require('mongoose');
const { Schema, models, model } = mongoose;

const schema = new Schema({
    maxLectures: {
        type: Number,
        required: true
    }
});

const MaxLecturesPerDay = models.MaxLecturesPerDay || model('MaxLecturesPerDay', schema);

module.exports = MaxLecturesPerDay;
