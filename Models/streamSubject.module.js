const mongoose = require('mongoose');
const { Schema, models, model } = mongoose;

const StreamSubjectMappingSchema = new Schema({
  stream: {
    type: Schema.Types.ObjectId,
    ref: 'Stream',
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
  ],
});

const StreamSubjectMapping = models.StreamSubjectMapping || model('StreamSubjectMapping', StreamSubjectMappingSchema);

module.exports = {
    StreamSubjectMapping
};
