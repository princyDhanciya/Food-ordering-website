const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/myfoodapp', { useNewUrlParser: true, useUnifiedTopology: true });

const cartSchema = new mongoose.Schema({
  name: String,
  rate: Number,
  quantity: Number,
});

const Cart = mongoose.model('Cart', cartSchema);

const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  date: Date,
  cartItems: [cartSchema],
});

const Order = mongoose.model('Order', orderSchema);

// Routes for managing carts
app.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

app.post('/cart', async (req, res) => {
  const newCartItem = new Cart(req.body);
  try {
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    console.error('Error saving cart item:', error);
    res.status(500).json({ error: 'Failed to save cart item' });
  }
});

app.delete('/cart/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

app.put('/cart/:id', async (req, res) => {
  try {
    await Cart.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// Routes for managing orders
app.post('/orders', async (req, res) => {
  const { name, address, date, items } = req.body;
  const newOrder = new Order({
    name,
    address,
    date,
    items,
  });
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});