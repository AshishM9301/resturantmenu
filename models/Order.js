const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  ordererId: { type: String, trim: true },

  orderItems: {
    type: Array,
    trim: true,
  },
});

const Orders = mongoose.model('Orders', orderSchema);

module.exports = { Orders };
