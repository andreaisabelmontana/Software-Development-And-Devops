import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../lib/api.js';
import { useCart } from '../lib/cart.jsx';
import { money } from '../lib/theme.js';
import { categoryConfig } from '../lib/categories.js';
import StarRating from '../components/StarRating.jsx';

export default function Product({ onOpenCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error,   setError]   = useState(null);
  const [qty,     setQty]     = useState(1);
  const { add } = useCart();

  useEffect(() => {
    setProduct(null); setError(null);
    getProduct(id).then(setProduct).catch(e => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <div className="container empty">
        <h2>Product not found</h2>
        <p>{error}</p>
        <Link to="/" className="btn btn-secondary">Back to the shop</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container product-detail">
        <div className="skeleton visual" />
        <div>
          <div className="skeleton" style={{ height: 28, width: '70%' }} />
          <div className="skeleton" style={{ height: 18, width: '40%', marginTop: 16 }} />
          <div className="skeleton" style={{ height: 60, marginTop: 24 }} />
        </div>
      </div>
    );
  }

  const inStock = (product.stock ?? 1) > 0;
  const cfg = categoryConfig(product.category);

  return (
    <div className="container product-detail">
      <div className="visual">
        {product.image
          ? <img src={product.image} alt={product.name} />
          : <div className="skeleton" style={{ width: '70%', height: '70%' }} />}
      </div>
      <div>
        <Link to="/" className="muted" style={{ fontSize: '0.85rem' }}>← Back to catalog</Link>
        <span
          className="product-tag"
          style={{
            color: cfg.color,
            borderBottom: `4px solid ${cfg.color}`,
          }}
        >
          {cfg.icon} {product.category}
        </span>
        <h1 style={{ marginTop: '0.75rem' }}>{product.name}</h1>
        <div className="rating-big">
          <StarRating rating={product.rating} size={18} />
        </div>
        <div className="price-big">{money(product.price)}</div>
        <p style={{ color: 'var(--fg-muted)', lineHeight: 1.6 }}>{product.description}</p>
        <p className="muted" style={{ fontSize: '0.9rem' }}>
          {inStock ? `In stock · ${product.stock} available` : 'Currently out of stock'}
        </p>

        <div className="row" style={{ marginTop: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="qty">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => q + 1)} aria-label="Increase quantity">+</button>
          </div>
          <button
            className="btn btn-primary"
            disabled={!inStock}
            onClick={() => { add(product, qty); onOpenCart?.(); }}
          >
            Add {qty} to cart · {money(product.price * qty)}
          </button>
        </div>
      </div>
    </div>
  );
}
