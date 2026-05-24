const products = [
  { id: 1,  name: 'Whey Protein Isolate', category: 'supplements', price: 54.99, oldPrice: 69.99, emoji: '🥤', badge: 'Best Seller', desc: 'Ultra-pure 90% protein isolate. 25g protein per serving, zero sugar.' },
  { id: 2,  name: 'Creatine Monohydrate', category: 'supplements', price: 24.99, oldPrice: null,  emoji: '⚗️', badge: 'New',         desc: 'Micronised for maximum absorption. 5g pure creatine per scoop.' },
  { id: 3,  name: 'Pre-Workout Boost',    category: 'supplements', price: 39.99, oldPrice: 49.99, emoji: '⚡', badge: 'Sale',        desc: 'Energy, focus, and endurance formula with 200mg caffeine.' },
  { id: 4,  name: 'BCAA Recovery',        category: 'supplements', price: 29.99, oldPrice: null,  emoji: '💊', badge: null,          desc: '2:1:1 BCAA ratio to support muscle recovery and reduce soreness.' },
  { id: 5,  name: 'Omega-3 Fish Oil',     category: 'supplements', price: 18.99, oldPrice: null,  emoji: '🐟', badge: null,          desc: 'High-potency EPA & DHA from wild-caught fish. 90 softgels.' },
  { id: 6,  name: 'Multivitamin Sport',   category: 'supplements', price: 22.99, oldPrice: null,  emoji: '🌿', badge: null,          desc: 'Complete vitamin and mineral complex designed for active people.' },
  { id: 7,  name: 'Adjustable Dumbbells', category: 'equipment',   price: 189.99,oldPrice: 229.99,emoji: '🏋️', badge: 'Sale',       desc: 'Replaces 15 sets of weights. Quick-lock dial system. 5–52.5 lbs.' },
  { id: 8,  name: 'Resistance Band Set',  category: 'equipment',   price: 34.99, oldPrice: null,  emoji: '🔵', badge: 'Best Seller', desc: '5 bands from 10–50 lbs resistance. Door anchor and handles included.' },
  { id: 9,  name: 'Foam Roller Pro',      category: 'equipment',   price: 44.99, oldPrice: null,  emoji: '🔴', badge: null,          desc: 'High-density foam for deep tissue massage and muscle recovery.' },
  { id: 10, name: 'Pull-Up Bar',          category: 'equipment',   price: 49.99, oldPrice: 59.99, emoji: '🏗️', badge: null,          desc: 'No-screw doorframe mount. Holds up to 300 lbs. Multi-grip.' },
  { id: 11, name: 'Yoga Mat Premium',     category: 'equipment',   price: 59.99, oldPrice: null,  emoji: '🧘', badge: 'New',         desc: 'Non-slip 6mm thick TPE mat with alignment lines. Eco-friendly.' },
  { id: 12, name: 'Jump Rope Speed',      category: 'equipment',   price: 19.99, oldPrice: null,  emoji: '🪢', badge: null,          desc: 'Ball-bearing handles for blazing fast rotations. Adjustable length.' },
  { id: 13, name: 'Pro Training Tee',     category: 'apparel',     price: 34.99, oldPrice: null,  emoji: '👕', badge: 'New',         desc: 'Moisture-wicking polyester blend. 4-way stretch. Anti-odour.' },
  { id: 14, name: 'Compression Leggings', category: 'apparel',     price: 64.99, oldPrice: 79.99, emoji: '🩱', badge: 'Sale',        desc: 'Graduated compression for improved circulation during workouts.' },
  { id: 15, name: 'Training Shorts',      category: 'apparel',     price: 29.99, oldPrice: null,  emoji: '🩲', badge: null,          desc: 'Lightweight quick-dry fabric with secure zip pockets.' },
  { id: 16, name: 'Sports Hoodie',        category: 'apparel',     price: 69.99, oldPrice: 89.99, emoji: '🧥', badge: 'Sale',        desc: 'Fleece-lined athletic hoodie with kangaroo pocket. Machine washable.' },
  { id: 17, name: 'Grip Gloves',          category: 'apparel',     price: 24.99, oldPrice: null,  emoji: '🧤', badge: null,          desc: 'Padded palms with wrist wrap support. Open-finger design.' },
  { id: 18, name: 'Meal Prep Kit',        category: 'nutrition',   price: 39.99, oldPrice: null,  emoji: '🥗', badge: 'Best Seller', desc: '7 BPA-free containers with macro-tracking lids. Microwave safe.' },
  { id: 19, name: 'Protein Bars (12pk)',  category: 'nutrition',   price: 27.99, oldPrice: 34.99, emoji: '🍫', badge: 'Sale',        desc: '20g protein, <5g sugar per bar. 6 flavours included.' },
  { id: 20, name: 'Shaker Bottle',        category: 'nutrition',   price: 14.99, oldPrice: null,  emoji: '🧉', badge: null,          desc: 'Leak-proof BlenderBall wire whisk. 28oz BPA-free.' },
  { id: 21, name: 'Electrolyte Powder',   category: 'nutrition',   price: 32.99, oldPrice: null,  emoji: '⚗️', badge: 'New',         desc: 'Zero-sugar hydration with sodium, potassium, and magnesium.' },
  { id: 22, name: 'Healthy Snack Box',    category: 'nutrition',   price: 44.99, oldPrice: null,  emoji: '📦', badge: null,          desc: '20 high-protein, low-sugar snacks curated by our nutritionists.' },
];

let cart = [];
let activeFilter = 'all';
let activeSort = 'default';
let searchQuery = '';

function getFilteredProducts() {
  let list = [...products];
  if (activeFilter !== 'all') list = list.filter(p => p.category === activeFilter);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }
  if (activeSort === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (activeSort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (activeSort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const list = getFilteredProducts();
  if (list.length === 0) {
    grid.innerHTML = '<p class="no-results">No products found. Try a different search or filter.</p>';
    return;
  }
  grid.innerHTML = list.map(p => `
    <div class="product-card">
      <div class="product-img">
        ${p.badge ? `<span class="product-badge${p.badge === 'Sale' ? ' sale' : ''}">${p.badge}</span>` : ''}
        ${p.emoji}
      </div>
      <div class="product-body">
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div>
            <span class="price">$${p.price.toFixed(2)}</span>
            ${p.oldPrice ? `<span class="price-old">$${p.oldPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-to-cart" onclick="addToCart(${p.id})">+ Add</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  document.getElementById('cartCount').textContent = count;

  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    cartFooter.style.display = 'none';
    return;
  }

  cartFooter.style.display = 'block';
  document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// Category filter
document.querySelectorAll('.cat-card').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-card').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProducts();
  });
});

// Sort
document.getElementById('sortSelect').addEventListener('change', e => {
  activeSort = e.target.value;
  renderProducts();
});

// Search
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value.trim();
  renderProducts();
});

// Cart open/close
document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
  cart = [];
  updateCartUI();
  closeCart();
  showToast('Order placed! Thank you for shopping with VitalFit 🎉');
});

// Init
renderProducts();
