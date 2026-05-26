// ============================================================
// API client — three-mode product source
//
//   1. LIVE     — VITE_API_URL is set and /health returns 200 →
//                 talk to Geethika2506/Devopsfinalproject's FastAPI directly.
//                 Schema:  { id, name, description, price, category,
//                            stock, image_url, ... }
//
//   2. FAKE-STORE — VITE_API_URL not set (or unreachable) →
//                 hit https://fakestoreapi.com/ directly. This is the *same*
//                 dataset the team's FastAPI seeds itself from, so the live
//                 site shows the exact same products as the team's original.
//                 Schema:  { id, title, price, description, category,
//                            image, rating: { rate, count } }
//
//   3. OFFLINE — both unreachable (no network) → static seed.js.
//
// Internally everything is normalised to a single shape so the UI never
// has to branch:
//   {
//     id, name, description, price, category,
//     image, stock, rating: { rate, count }
//   }
// ============================================================

import { SEED_PRODUCTS, nextSeedId } from './seed.js';

const ENV_API = import.meta.env.VITE_API_URL?.trim() || '';
const FSA = 'https://fakestoreapi.com';

const LS_KEYS = {
  user:    'shop.demo.user',
  orders:  'shop.demo.orders',
  reviews: 'shop.demo.reviews',
};

function lsRead(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function lsWrite(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ----- mode probe -------------------------------------------------------
let _modePromise = null;
export function getApiMode() {
  if (_modePromise) return _modePromise;
  _modePromise = (async () => {
    // 1) If a backend URL is configured AND reachable, prefer it.
    if (ENV_API) {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 1500);
        const r = await fetch(`${ENV_API.replace(/\/$/, '')}/health`, { signal: ctrl.signal });
        clearTimeout(t);
        if (r.ok) return 'live';
      } catch {}
    }
    // 2) Otherwise, can we reach the public Fake Store API?
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 2500);
      const r = await fetch(`${FSA}/products?limit=1`, { signal: ctrl.signal });
      clearTimeout(t);
      if (r.ok) return 'fakestore';
    } catch {}
    // 3) Last resort.
    return 'offline';
  })();
  return _modePromise;
}

// ----- shape normalisers -----------------------------------------------
function prettyCategory(c) {
  // Fake Store API uses "men's clothing", "jewelery" (sic), etc.
  if (!c) return 'Other';
  return c.replace(/jewelery/i, 'jewelry')
          .split(/\s+/)
          .map(w => w[0].toUpperCase() + w.slice(1))
          .join(' ');
}

function fromFSA(p) {
  return {
    id: p.id,
    name: p.title,
    description: p.description,
    price: p.price,
    category: prettyCategory(p.category),
    image: p.image,
    rating: p.rating || { rate: 0, count: 0 },
    stock: 50,
  };
}

function fromLive(p) {
  return {
    id: p.id,
    name: p.name || p.title,
    description: p.description,
    price: p.price,
    category: prettyCategory(p.category),
    image: p.image || p.image_url,
    rating: p.rating || { rate: 0, count: 0 },
    stock: p.stock ?? 50,
  };
}

function fromSeed(p) {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    image: p.image || null,
    rating: { rate: 4.2, count: 24 },
    stock: p.stock ?? 50,
  };
}

// ----- HTTP helpers -----------------------------------------------------
async function liveGet(path, { token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const r = await fetch(`${ENV_API.replace(/\/$/, '')}${path}`, { headers });
  if (!r.ok) throw new Error(`API GET ${path} → ${r.status}`);
  return r.json();
}
async function livePost(path, body, { token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const r = await fetch(`${ENV_API.replace(/\/$/, '')}${path}`, {
    method: 'POST', headers, body: JSON.stringify(body),
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    throw new Error(`API POST ${path} → ${r.status}: ${txt}`);
  }
  return r.json();
}

// ============================================================
// Products
// ============================================================
export async function listProducts() {
  const mode = await getApiMode();
  if (mode === 'live') {
    const data = await liveGet('/products/');
    return data.map(fromLive);
  }
  if (mode === 'fakestore') {
    const r = await fetch(`${FSA}/products`);
    const data = await r.json();
    return data.map(fromFSA);
  }
  return SEED_PRODUCTS.map(fromSeed);
}

export async function getProduct(id) {
  const mode = await getApiMode();
  if (mode === 'live') {
    return fromLive(await liveGet(`/products/${id}`));
  }
  if (mode === 'fakestore') {
    const r = await fetch(`${FSA}/products/${id}`);
    if (!r.ok) throw new Error(`Product ${id} not found`);
    return fromFSA(await r.json());
  }
  const p = SEED_PRODUCTS.find(x => x.id === Number(id));
  if (!p) throw new Error(`Product ${id} not found`);
  return fromSeed(p);
}

export async function listCategories() {
  const mode = await getApiMode();
  if (mode === 'live') {
    const data = await liveGet('/products/categories');
    return data.map(prettyCategory);
  }
  if (mode === 'fakestore') {
    const r = await fetch(`${FSA}/products/categories`);
    const data = await r.json();
    return data.map(prettyCategory);
  }
  return [...new Set(SEED_PRODUCTS.map(p => p.category))];
}

// ============================================================
// Auth (demo only — Fake Store auth is fake too)
// ============================================================
export async function register({ email, password, name }) {
  const mode = await getApiMode();
  if (mode === 'live') {
    return livePost('/auth/register', { email, password, name });
  }
  const user = { id: nextSeedId(), email, name: name || email.split('@')[0], token: `demo-${Date.now()}` };
  lsWrite(LS_KEYS.user, user);
  return user;
}

export async function login({ email, password }) {
  const mode = await getApiMode();
  if (mode === 'live') {
    return livePost('/auth/login/json', { email, password });
  }
  const user = { id: nextSeedId(), email, name: email.split('@')[0], token: `demo-${Date.now()}` };
  lsWrite(LS_KEYS.user, user);
  return user;
}

export function currentUser() {
  return lsRead(LS_KEYS.user, null);
}

export function logout() {
  try { localStorage.removeItem(LS_KEYS.user); } catch {}
}

// ============================================================
// Orders
// ============================================================
export async function placeOrder({ items, total, shipping, payment, token }) {
  const mode = await getApiMode();
  if (mode === 'live') {
    return livePost('/orders/', { items, total, shipping }, { token });
  }
  const orders = lsRead(LS_KEYS.orders, []);
  const order = {
    id: nextSeedId(),
    items, total, shipping,
    payment_last4: (payment?.number || '').replace(/\s/g, '').slice(-4),
    status: 'confirmed',
    created_at: new Date().toISOString(),
  };
  lsWrite(LS_KEYS.orders, [order, ...orders]);
  return order;
}

export async function listOrders({ token } = {}) {
  const mode = await getApiMode();
  if (mode === 'live') {
    return liveGet('/orders/', { token });
  }
  return lsRead(LS_KEYS.orders, []);
}
