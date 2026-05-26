// ============================================================
// API client — mirrors Geethika2506/Devopsfinalproject's FastAPI
//
// At runtime the client tries to talk to the real backend (whose URL is
// supplied via the VITE_API_URL build-time env). If that endpoint isn't
// configured or is unreachable, the client transparently falls back to a
// browser-only "demo mode" that uses the seeded catalog and persists cart /
// auth state in localStorage. That way the live GitHub Pages site is fully
// functional without anything to deploy server-side.
// ============================================================

import { SEED_PRODUCTS, nextSeedId } from './seed.js';

const ENV_API = import.meta.env.VITE_API_URL?.trim() || '';

// In-memory + localStorage mirror of the FastAPI tables.
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
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
}

// ----- Backend probe ----------------------------------------------------
let _modePromise = null;
export function getApiMode() {
  if (_modePromise) return _modePromise;
  if (!ENV_API) {
    _modePromise = Promise.resolve('demo');
    return _modePromise;
  }
  _modePromise = (async () => {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 1500);
      const r = await fetch(`${ENV_API.replace(/\/$/, '')}/health`, { signal: ctrl.signal });
      clearTimeout(t);
      return r.ok ? 'live' : 'demo';
    } catch {
      return 'demo';
    }
  })();
  return _modePromise;
}

// ----- HTTP helper ------------------------------------------------------
async function http(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const r = await fetch(`${ENV_API.replace(/\/$/, '')}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) {
    const text = await r.text().catch(() => '');
    throw new Error(`API ${method} ${path} → ${r.status}: ${text}`);
  }
  if (r.status === 204) return null;
  return r.json();
}

// ============================================================
// Products  (GET /products/, GET /products/{id}, GET /products/categories)
// ============================================================
export async function listProducts() {
  if (await getApiMode() === 'live') {
    return http('/products/');
  }
  return [...SEED_PRODUCTS];
}

export async function getProduct(id) {
  if (await getApiMode() === 'live') {
    return http(`/products/${id}`);
  }
  const p = SEED_PRODUCTS.find(x => x.id === Number(id));
  if (!p) throw new Error(`Product ${id} not found`);
  return p;
}

export async function listCategories() {
  if (await getApiMode() === 'live') {
    return http('/products/categories');
  }
  return [...new Set(SEED_PRODUCTS.map(p => p.category))];
}

// ============================================================
// Auth  (POST /auth/register, /auth/login/json, GET /auth/me)
// ============================================================
export async function register({ email, password, name }) {
  if (await getApiMode() === 'live') {
    return http('/auth/register', { method: 'POST', body: { email, password, name } });
  }
  const user = { id: nextSeedId(), email, name: name || email.split('@')[0], token: `demo-${Date.now()}` };
  lsWrite(LS_KEYS.user, user);
  return user;
}

export async function login({ email, password }) {
  if (await getApiMode() === 'live') {
    return http('/auth/login/json', { method: 'POST', body: { email, password } });
  }
  // Demo mode: any password works; we just remember the email.
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
// Orders  (POST /orders/, GET /orders/)
// ============================================================
export async function placeOrder({ items, total, shipping, payment, token }) {
  if (await getApiMode() === 'live') {
    return http('/orders/', { method: 'POST', body: { items, total, shipping }, token });
  }
  const orders = lsRead(LS_KEYS.orders, []);
  const order = {
    id: nextSeedId(),
    items, total, shipping,
    // Never store the full PAN — keep only the last 4 like a real PSP would.
    payment_last4: (payment?.number || '').replace(/\s/g, '').slice(-4),
    status: 'confirmed',
    created_at: new Date().toISOString(),
  };
  lsWrite(LS_KEYS.orders, [order, ...orders]);
  return order;
}

export async function listOrders({ token } = {}) {
  if (await getApiMode() === 'live') {
    return http('/orders/', { token });
  }
  return lsRead(LS_KEYS.orders, []);
}
