// Deterministic procedural "product image" — no external assets needed,
// so the live site works offline / on GitHub Pages with zero CDN dependency.
// Each product gets a category-themed glyph in IE colors.

const PALETTE = ['#0b1f3a', '#15315a', '#e0223c', '#b51a30'];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function color(seed, i) { return PALETTE[(hash(seed) + i) % PALETTE.length]; }

const GLYPHS = {
  'Apparel':              (s) => <Glyph s={s} d="M16 28 L40 16 L56 16 L80 28 L72 38 L60 32 L60 80 L36 80 L36 32 L24 38 Z" />,
  'Bags & Accessories':   (s) => <Glyph s={s} d="M22 36 L74 36 L70 84 L26 84 Z M34 36 L34 22 Q34 14 48 14 Q62 14 62 22 L62 36" />,
  'Home':                 (s) => <Glyph s={s} d="M20 44 L48 20 L76 44 L76 84 L56 84 L56 60 L40 60 L40 84 L20 84 Z" />,
  'Stationery':           (s) => <Glyph s={s} d="M30 16 L66 16 L66 84 L30 84 Z M38 30 L58 30 M38 42 L58 42 M38 54 L58 54 M38 66 L52 66" />,
  'Tech':                 (s) => <Glyph s={s} d="M14 28 L82 28 L82 64 L14 64 Z M28 78 L68 78" />,
  'Books':                (s) => <Glyph s={s} d="M18 16 L48 22 L48 84 L18 80 Z M48 22 L78 16 L78 80 L48 84 Z" />,
  'Drinks':               (s) => <Glyph s={s} d="M30 16 L66 16 L62 84 L34 84 Z M32 30 L64 30" />,
};

function Glyph({ s, d }) {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
      <rect width="96" height="96" rx="14" fill={color(s, 0)} opacity="0.08" />
      <path d={d} fill="none" stroke={color(s, 1)} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="78" cy="20" r="4" fill={color(s, 2)} />
    </svg>
  );
}

export default function ProductGlyph({ product }) {
  const fn = GLYPHS[product.category] || GLYPHS['Tech'];
  return fn(product.name);
}
