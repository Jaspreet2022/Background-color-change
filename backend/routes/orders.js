const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/orders  — place order from cart items
router.post('/', protect, async (req, res) => {
  try {
    const { items, address } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ message: 'Order must contain at least one item' });

    // Validate products and compute total
    const orderItems = [];
    let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.active)
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      orderItems.push({ product: product._id, name: product.name, price: product.price, qty: item.qty });
      total += product.price * item.qty;
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      total: Number(total.toFixed(2)),
      address,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders  — current user's orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name emoji')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'name emoji');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorised' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/admin/all  — all orders (admin)
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/orders/:id/status  — update status (admin)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
