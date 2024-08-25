const express = require('express');
const router = express.Router();
const Cart = require('./models/Cart');

router.get('/', async (req, res) => {
  const cartItems = await Cart.find();
  res.json(cartItems);
});

router.post('/', async (req, res) => {
  const newCartItem = new Cart(req.body);
  await newCartItem.save();
  res.json(newCartItem);
});

router.delete('/:id', async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

router.put('/:id', async (req, res) => {
  await Cart.findByIdAndUpdate(req.params.id, req.body);
  res.sendStatus(200);
});

module.exports = router;
