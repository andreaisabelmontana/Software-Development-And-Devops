// Single source of truth for the five filter chips' visual identity.
// Keep names verbatim how the API returns them after prettyCategory():
//   "Men's Clothing", "Women's Clothing", "Jewelry", "Electronics".

const CONFIG = {
  "Men's Clothing":   { color: 'var(--c-pink)',   className: 'cat-mens',   icon: '👕' },
  "Women's Clothing": { color: 'var(--c-purple)', className: 'cat-womens', icon: '👗' },
  "Jewelry":          { color: 'var(--c-yellow)', className: 'cat-jewel',  icon: '💎' },
  "Electronics":      { color: 'var(--c-teal)',   className: 'cat-elec',   icon: '💻' },
};

export function categoryConfig(name) {
  return CONFIG[name] || { color: 'var(--gray-500)', className: 'cat-default', icon: '🛍️' };
}
