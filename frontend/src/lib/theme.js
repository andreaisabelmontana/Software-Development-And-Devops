// Persisted light/dark toggle. Defaults to OS preference.
const LS_KEY = 'shop.theme';

export function getInitialTheme() {
  try {
    const v = localStorage.getItem(LS_KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch {}
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem(LS_KEY, t); } catch {}
}

export function money(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}
