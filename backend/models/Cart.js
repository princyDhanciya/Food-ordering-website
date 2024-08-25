const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  name: String,
  rate: Number,
  quantity: Number,
});

module.exports = mongoose.model('Cart', cartSchema);
