// backend/models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  items: { type: Array, required: true }, // Assuming items array contains details of ordered items
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
