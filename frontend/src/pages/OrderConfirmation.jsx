import { Link, useLocation, useParams } from 'react-router-dom';
import { money } from '../lib/theme.js';

export default function OrderConfirmation() {
  const { id } = useParams();
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="container">
      <div className="success">
        <div className="check">✓</div>
        <h1>Order #{id} confirmed</h1>
        <p className="muted" style={{ maxWidth: '46ch', margin: '0 auto 1.5rem' }}>
          Thanks for shopping at The Shop. A confirmation will land in your inbox shortly
          (in this demo, just imagine it landed).
        </p>

        {order && (
          <div className="card" style={{ maxWidth: 540, margin: '0 auto', padding: '1.5rem', textAlign: 'left' }}>
            <h3>Summary</h3>
            <div className="stack" style={{ gap: '0.4rem' }}>
              {order.items.map((it, i) => (
                <div key={i} className="row between" style={{ fontSize: '0.9rem' }}>
                  <span>{it.qty} × #{it.product_id}</span>
                  <span>{money(it.price * it.qty)}</span>
                </div>
              ))}
            </div>
            <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '1rem 0' }} />
            <div className="row between" style={{ fontWeight: 600 }}>
              <span>Total charged</span>
              <span>{money(order.total)}</span>
            </div>
            {order.payment_last4 && (
              <p className="muted" style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
                Paid with card ending •••• {order.payment_last4}
              </p>
            )}
            {order.shipping && (
              <p className="muted" style={{ fontSize: '0.85rem' }}>
                Shipping to {order.shipping.name} · {order.shipping.address}, {order.shipping.city} {order.shipping.zip}, {order.shipping.country}
              </p>
            )}
          </div>
        )}

        <div className="row" style={{ justifyContent: 'center', marginTop: '2rem', gap: '0.75rem' }}>
          <Link to="/" className="btn btn-secondary">Keep shopping</Link>
          <Link to="/orders" className="btn btn-primary">View my orders</Link>
        </div>
      </div>
    </div>
  );
}
