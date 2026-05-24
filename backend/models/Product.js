const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['supplements', 'equipment', 'apparel', 'nutrition'] },
  price:    { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, default: null },
  emoji:    { type: String, default: '📦' },
  badge:    { type: String, default: null },
  desc:     { type: String, required: true },
  stock:    { type: Number, default: 100, min: 0 },
  active:   { type: Boolean, default: true },
}, { timestamps: true });

productSchema.index({ category: 1 });
productSchema.index({ name: 'text', desc: 'text' });

module.exports = mongoose.model('Product', productSchema);
