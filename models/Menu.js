const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  itemType: {
    type: String,
    trim: true,
  },
  itemName: {
    type: String,
    trim: true,
  },
  itemValue: {
    type: Number,
    trim: true,
  },
  itemImagName: {
    type: String,
    trim: true,
  },
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = { Menu };
