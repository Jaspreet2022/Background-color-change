const router = require('express').Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// Cart is stored in the user's session via a simple in-memory Map keyed by userId.
// For production, replace with a Cart MongoDB model or Redis.
const carts = new Map();

const getCart = (userId) => carts.get(userId.toString()) || [];
const setCart = (userId, cart) => carts.set(userId.toString(), cart);

// GET /api/cart
router.get('/', protect, (req, res) => {
  const cart = getCart(req.user._id);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  res.json({ cart, total: Number(total.toFixed(2)), count: cart.reduce((s, i) => s + i.qty, 0) });
});

// POST /api/cart  — add or increment item
router.post('/', protect, async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId is required' });

    const product = await Product.findById(productId);
    if (!product || !product.active) return res.status(404).json({ message: 'Product not found' });

    const cart = getCart(req.user._id);
    const existing = cart.find(i => i.productId === productId);

    if (existing) {
      existing.qty += Number(qty);
    } else {
      cart.push({ productId, name: product.name, price: product.price, emoji: product.emoji, qty: Number(qty) });
    }

    setCart(req.user._id, cart);
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    res.json({ cart, total: Number(total.toFixed(2)), count: cart.reduce((s, i) => s + i.qty, 0) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/cart/:productId  — set quantity
router.put('/:productId', protect, (req, res) => {
  const { qty } = req.body;
  if (qty == null || qty < 0) return res.status(400).json({ message: 'Valid qty required' });

  let cart = getCart(req.user._id);
  if (Number(qty) === 0) {
    cart = cart.filter(i => i.productId !== req.params.productId);
  } else {
    const item = cart.find(i => i.productId === req.params.productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });
    item.qty = Number(qty);
  }

  setCart(req.user._id, cart);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  res.json({ cart, total: Number(total.toFixed(2)), count: cart.reduce((s, i) => s + i.qty, 0) });
});

// DELETE /api/cart/:productId  — remove item
router.delete('/:productId', protect, (req, res) => {
  const cart = getCart(req.user._id).filter(i => i.productId !== req.params.productId);
  setCart(req.user._id, cart);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  res.json({ cart, total: Number(total.toFixed(2)), count: cart.reduce((s, i) => s + i.qty, 0) });
});

// DELETE /api/cart  — clear cart
router.delete('/', protect, (req, res) => {
  setCart(req.user._id, []);
  res.json({ cart: [], total: 0, count: 0 });
});

module.exports = router;
