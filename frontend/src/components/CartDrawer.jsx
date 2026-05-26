import { Link } from 'react-router-dom';
import { useCart } from '../lib/cart.jsx';
import { money } from '../lib/theme.js';

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, shipping, tax, total, setQty, remove } = useCart();

  return (
    <>
      <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Shopping cart">
        <header>
          <h2>Your bag</h2>
          <button className="btn btn-ghost" onClick={onClose} aria-label="Close cart">✕</button>
        </header>

        <div className="items">
          {items.length === 0 && (
            <div className="empty">
              <p>Your bag is empty.</p>
              <Link to="/" className="btn btn-secondary" onClick={onClose}>Browse The Shop</Link>
            </div>
          )}
          {items.map(line => (
            <div className="line" key={line.id}>
              <div className="thumb">
                {line.image
                  ? <img src={line.image} alt={line.name} />
                  : <div className="skeleton" style={{ width: '100%', height: '100%' }} />}
              </div>
              <div>
                <div className="name">{line.name}</div>
                <div className="meta">{line.category}</div>
                <div className="qty-mini">
                  <button onClick={() => setQty(line.id, line.qty - 1)} aria-label="Decrease">−</button>
                  <span>{line.qty}</span>
                  <button onClick={() => setQty(line.id, line.qty + 1)} aria-label="Increase">+</button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="price">{money(line.price * line.qty)}</div>
                <button
                  className="btn btn-ghost"
                  style={{ padding: '0.2em 0.5em', fontSize: '0.72rem' }}
                  onClick={() => remove(line.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <footer>
            <div className="row between"><span className="muted">Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="row between"><span className="muted">Shipping</span><span>{shipping === 0 ? 'Free' : money(shipping)}</span></div>
            <div className="row between"><span className="muted">Tax (4%)</span><span>{money(tax)}</span></div>
            <div className="totals"><span>Total</span><span>{money(total)}</span></div>
            <Link to="/checkout" className="btn btn-primary" onClick={onClose}>
              Proceed to checkout
            </Link>
          </footer>
        )}
      </aside>
    </>
  );
}
