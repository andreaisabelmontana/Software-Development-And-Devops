import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listCategories, listProducts } from '../lib/api.js';
import { useCart } from '../lib/cart.jsx';
import { money } from '../lib/theme.js';
import ProductGlyph from '../components/ProductGlyph.jsx';

export default function Home({ onOpenCart }) {
  const [products,   setProducts]   = useState(null);
  const [categories, setCategories] = useState([]);
  const [active,     setActive]     = useState('All');
  const [search,     setSearch]     = useState('');
  const { add } = useCart();

  useEffect(() => {
    listProducts().then(setProducts).catch(() => setProducts([]));
    listCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const filtered = useMemo(() => {
    if (!products) return null;
    return products.filter(p => {
      const cat = active === 'All' || p.category === active;
      const q = search.trim().toLowerCase();
      const matchesQ = !q || p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
      return cat && matchesQ;
    });
  }, [products, active, search]);

  return (
    <>
      <section className="hero">
        <div className="container inner">
          <div>
            <span className="badge badge-accent">IE BCSAI · DevOps</span>
            <h1>Built in Madrid.<br/>Shipped to your <em>cart</em>.</h1>
            <p>
              A cloud-native marketplace from the IE School of Science &amp; Technology.
              Twenty hand-picked goods backed by a FastAPI service, containerised
              with Docker, and delivered through a CI/CD pipeline.
            </p>
            <div className="hero-actions">
              <a href="#catalog" className="btn btn-primary">Shop the catalog</a>
              <Link to="/about" className="btn btn-secondary">
                About the project
              </Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="tile">T</div>
            <div className="tile dark">H</div>
            <div className="tile">E</div>
            <div className="tile dark">S</div>
            <div className="tile accent">★</div>
            <div className="tile dark">H</div>
            <div className="tile">O</div>
            <div className="tile dark">P</div>
            <div className="tile">!</div>
          </div>
        </div>
      </section>

      <section className="section" id="catalog">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Catalog</span>
              <h2>Twenty things worth carrying.</h2>
            </div>
            <div className="row" style={{ gap: '0.5rem' }}>
              <div className="field" style={{ width: 'min(280px, 100%)' }}>
                <input
                  placeholder="Search the shop…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search products"
                />
              </div>
            </div>
          </div>

          <div className="filters" style={{ marginBottom: '1.5rem' }}>
            <button
              className={`filter-chip ${active === 'All' ? 'active' : ''}`}
              onClick={() => setActive('All')}
            >All</button>
            {categories.map(c => (
              <button
                key={c}
                className={`filter-chip ${active === c ? 'active' : ''}`}
                onClick={() => setActive(c)}
              >{c}</button>
            ))}
          </div>

          {filtered === null && (
            <div className="product-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card" style={{ overflow: 'hidden' }}>
                  <div className="skeleton" style={{ aspectRatio: '4 / 3' }} />
                  <div style={{ padding: '1rem' }}>
                    <div className="skeleton" style={{ height: 14, width: '60%' }} />
                    <div className="skeleton" style={{ height: 14, width: '90%', marginTop: 8 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered && filtered.length === 0 && (
            <div className="empty">
              <p>No products match your search.</p>
            </div>
          )}

          {filtered && filtered.length > 0 && (
            <div className="product-grid">
              {filtered.map(p => (
                <article className="product-card" key={p.id}>
                  <Link to={`/product/${p.id}`} className="thumb" style={{ borderBottom: 'none' }} aria-label={p.name}>
                    <ProductGlyph product={p} />
                  </Link>
                  <div className="body">
                    <span className="category">{p.category}</span>
                    <h3>
                      <Link to={`/product/${p.id}`} style={{ borderBottom: 'none' }}>{p.name}</Link>
                    </h3>
                    <div className="price-row">
                      <span className="price">{money(p.price)}</span>
                      <button className="add" onClick={() => { add(p); onOpenCart?.(); }}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
