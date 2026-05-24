require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: 'Whey Protein Isolate', category: 'supplements', price: 54.99, oldPrice: 69.99, emoji: '🥤', badge: 'Best Seller', desc: 'Ultra-pure 90% protein isolate. 25g protein per serving, zero sugar.', stock: 200 },
  { name: 'Creatine Monohydrate', category: 'supplements', price: 24.99, emoji: '⚗️',  badge: 'New',  desc: 'Micronised for maximum absorption. 5g pure creatine per scoop.', stock: 150 },
  { name: 'Pre-Workout Boost',    category: 'supplements', price: 39.99, oldPrice: 49.99, emoji: '⚡', badge: 'Sale', desc: 'Energy, focus, and endurance formula with 200mg caffeine.', stock: 120 },
  { name: 'BCAA Recovery',        category: 'supplements', price: 29.99, emoji: '💊', desc: '2:1:1 BCAA ratio to support muscle recovery and reduce soreness.', stock: 180 },
  { name: 'Omega-3 Fish Oil',     category: 'supplements', price: 18.99, emoji: '🐟', desc: 'High-potency EPA & DHA from wild-caught fish. 90 softgels.', stock: 200 },
  { name: 'Multivitamin Sport',   category: 'supplements', price: 22.99, emoji: '🌿', desc: 'Complete vitamin and mineral complex designed for active people.', stock: 200 },
  { name: 'Adjustable Dumbbells', category: 'equipment',   price: 189.99, oldPrice: 229.99, emoji: '🏋️', badge: 'Sale', desc: 'Replaces 15 sets of weights. Quick-lock dial system. 5–52.5 lbs.', stock: 50 },
  { name: 'Resistance Band Set',  category: 'equipment',   price: 34.99, emoji: '🔵', badge: 'Best Seller', desc: '5 bands from 10–50 lbs resistance. Door anchor and handles included.', stock: 100 },
  { name: 'Foam Roller Pro',      category: 'equipment',   price: 44.99, emoji: '🔴', desc: 'High-density foam for deep tissue massage and muscle recovery.', stock: 80 },
  { name: 'Pull-Up Bar',          category: 'equipment',   price: 49.99, oldPrice: 59.99, emoji: '🏗️', desc: 'No-screw doorframe mount. Holds up to 300 lbs. Multi-grip.', stock: 60 },
  { name: 'Yoga Mat Premium',     category: 'equipment',   price: 59.99, emoji: '🧘', badge: 'New', desc: 'Non-slip 6mm thick TPE mat with alignment lines. Eco-friendly.', stock: 90 },
  { name: 'Jump Rope Speed',      category: 'equipment',   price: 19.99, emoji: '🪢', desc: 'Ball-bearing handles for blazing fast rotations. Adjustable length.', stock: 120 },
  { name: 'Pro Training Tee',     category: 'apparel',     price: 34.99, emoji: '👕', badge: 'New', desc: 'Moisture-wicking polyester blend. 4-way stretch. Anti-odour.', stock: 150 },
  { name: 'Compression Leggings', category: 'apparel',     price: 64.99, oldPrice: 79.99, emoji: '🩱', badge: 'Sale', desc: 'Graduated compression for improved circulation during workouts.', stock: 100 },
  { name: 'Training Shorts',      category: 'apparel',     price: 29.99, emoji: '🩲', desc: 'Lightweight quick-dry fabric with secure zip pockets.', stock: 130 },
  { name: 'Sports Hoodie',        category: 'apparel',     price: 69.99, oldPrice: 89.99, emoji: '🧥', badge: 'Sale', desc: 'Fleece-lined athletic hoodie with kangaroo pocket. Machine washable.', stock: 80 },
  { name: 'Grip Gloves',          category: 'apparel',     price: 24.99, emoji: '🧤', desc: 'Padded palms with wrist wrap support. Open-finger design.', stock: 160 },
  { name: 'Meal Prep Kit',        category: 'nutrition',   price: 39.99, emoji: '🥗', badge: 'Best Seller', desc: '7 BPA-free containers with macro-tracking lids. Microwave safe.', stock: 100 },
  { name: 'Protein Bars (12pk)',  category: 'nutrition',   price: 27.99, oldPrice: 34.99, emoji: '🍫', badge: 'Sale', desc: '20g protein, <5g sugar per bar. 6 flavours included.', stock: 200 },
  { name: 'Shaker Bottle',        category: 'nutrition',   price: 14.99, emoji: '🧉', desc: 'Leak-proof BlenderBall wire whisk. 28oz BPA-free.', stock: 250 },
  { name: 'Electrolyte Powder',   category: 'nutrition',   price: 32.99, emoji: '⚗️', badge: 'New', desc: 'Zero-sugar hydration with sodium, potassium, and magnesium.', stock: 150 },
  { name: 'Healthy Snack Box',    category: 'nutrition',   price: 44.99, emoji: '📦', desc: '20 high-protein, low-sugar snacks curated by our nutritionists.', stock: 80 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vitalfit');
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    const inserted = await Product.insertMany(products);
    console.log(`✅ Seeded ${inserted.length} products`);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
