const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  feedbackGiverId: {
    type: String,
    trim: true,
    unique: true,
  },
  feedback: {
    type: String,
    trim: true,
  },
  feedbackType: {
    type: Boolean,
    default: 0,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = { Feedback };
