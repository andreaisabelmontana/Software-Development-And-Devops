import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listCategories, listProducts } from '../lib/api.js';
import { useCart } from '../lib/cart.jsx';
import { money } from '../lib/theme.js';
import { categoryConfig } from '../lib/categories.js';
import StarRating from '../components/StarRating.jsx';

const SORTS = {
  popular:     { label: 'Popular',          fn: (a, b) => (b.rating?.count || 0) - (a.rating?.count || 0) },
  rating:      { label: 'Top rated',        fn: (a, b) => (b.rating?.rate  || 0) - (a.rating?.rate  || 0) },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc':{ label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  'name-asc':  { label: 'Name: A → Z',       fn: (a, b) => a.name.localeCompare(b.name) },
};

export default function Home({ onOpenCart }) {
  const [products,   setProducts]   = useState(null);
  const [categories, setCategories] = useState([]);
  const [active,     setActive]     = useState('All');
  const [search,     setSearch]     = useState('');
  const [sort,       setSort]       = useState('popular');
  const { add } = useCart();

  useEffect(() => {
    listProducts().then(setProducts).catch(() => setProducts([]));
    listCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const filtered = useMemo(() => {
    if (!products) return null;
    const q = search.trim().toLowerCase();
    const out = products.filter(p => {
      if (active !== 'All' && p.category !== active) return false;
      if (q && !(p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q))) return false;
      return true;
    });
    const cmp = SORTS[sort]?.fn || SORTS.popular.fn;
    return [...out].sort(cmp);
  }, [products, active, search, sort]);

  const allConfig = { color: 'var(--brand)', className: 'cat-all', icon: '🛍️' };

  return (
    <>
      <section className="hero">
        <div className="container inner">
          <span className="eyebrow">IE BCSAI · Software Development &amp; DevOps</span>
          <h1>Built in Madrid. Shipped to your <span className="accent">cart</span>.</h1>
          <p>
            A cloud-native marketplace from the IE School of Science &amp; Technology.
            Real products, real reviews, full DevOps pipeline. Backed by a FastAPI service,
            containerised with Docker, delivered through CI/CD.
          </p>
          <div className="hero-actions">
            <a href="#catalog" className="btn btn-primary">Shop the catalog</a>
            <Link to="/about" className="btn btn-secondary">About the project</Link>
          </div>
        </div>
        <div className="accent-stripe" aria-hidden="true" />
      </section>

      <section className="section" id="catalog">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Products{filtered ? ` (${filtered.length})` : ''}</h2>
            </div>
          </div>

          <div className="filter-bar">
            <div className="filters" role="tablist" aria-label="Filter by category">
              {['All', ...categories].map(c => {
                const cfg = c === 'All' ? allConfig : categoryConfig(c);
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={active === c}
                    className={`filter-chip ${cfg.className} ${active === c ? 'active' : ''}`}
                    onClick={() => setActive(c)}
                  >
                    <span aria-hidden="true">{cfg.icon}</span>
                    <span>{c === 'All' ? 'All Products' : c}</span>
                  </button>
                );
              })}
            </div>

            <div className="row" style={{ gap: '0.6rem', flexWrap: 'wrap' }}>
              <input
                className="search-input"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search products"
              />
              <label className="sort-select">
                <span>Sort by</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {Object.entries(SORTS).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {filtered === null && (
            <div className="product-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card" style={{ overflow: 'hidden' }}>
                  <div className="skeleton" style={{ aspectRatio: '1', borderRadius: 0 }} />
                  <div style={{ padding: '1rem' }}>
                    <div className="skeleton" style={{ height: 14, width: '60%' }} />
                    <div className="skeleton" style={{ height: 14, width: '90%', marginTop: 8 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered && filtered.length === 0 && (
            <div className="empty"><p>No products match your search.</p></div>
          )}

          {filtered && filtered.length > 0 && (
            <div className="product-grid">
              {filtered.map(p => {
                const cfg = categoryConfig(p.category);
                return (
                  <article
                    className={`product-card ${cfg.className}`}
                    key={p.id}
                    style={{ '--cat': cfg.color }}
                  >
                    <Link to={`/product/${p.id}`} className="thumb" style={{ borderBottom: 'none' }} aria-label={p.name}>
                      {p.image
                        ? <img src={p.image} alt={p.name} loading="lazy" />
                        : <div className="skeleton" style={{ width: '70%', height: '70%' }} />}
                    </Link>
                    <div className="body">
                      <h3>
                        <Link to={`/product/${p.id}`} style={{ borderBottom: 'none' }}>{p.name}</Link>
                      </h3>
                      <span className="category">{p.category}</span>
                      <span className="price">{money(p.price)}</span>
                      <StarRating rating={p.rating} />
                      <button className="add" onClick={() => { add(p); onOpenCart?.(); }}>
                        Add to Cart
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
