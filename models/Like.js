const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  newLikerId: {
    type: String,
    trim: true,
    unique: true,
  },
  Items: {
    type: Array,
    trim: true,
  },
  like: {
    type: Number,
    trim: true,
    default: 0,
  },
  dislike: {
    type: Number,
    trim: true,
    default: 0,
  },
});

const Like = mongoose.model('Like', likeSchema);

module.exports = { Like };
