const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  qty:      { type: Number, required: true, min: 1 },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:   { type: [orderItemSchema], required: true },
  total:   { type: Number, required: true },
  status:  { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  address: {
    street:  { type: String },
    city:    { type: String },
    country: { type: String },
    zip:     { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
