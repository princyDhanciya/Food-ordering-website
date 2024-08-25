// backend/routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /orders - Create a new order
router.post('/orders', async (req, res) => {
  try {
    const { name, address, date, items } = req.body;

    const newOrder = new Order({
      name,
      address,
      date,
      items,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// GET /orders - Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

module.exports = router;
