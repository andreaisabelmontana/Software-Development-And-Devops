import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listOrders, currentUser } from '../lib/api.js';
import { money } from '../lib/theme.js';

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const user = currentUser();

  useEffect(() => {
    listOrders({ token: user?.token }).then(setOrders).catch(() => setOrders([]));
  }, []);

  return (
    <div className="container" style={{ padding: '2.5rem 0 4rem' }}>
      <h1>Your orders</h1>
      <p className="muted">Past purchases stored in this browser (or, when configured, fetched from the FastAPI backend).</p>

      {orders === null && (
        <div className="stack" style={{ marginTop: '1.5rem' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card" style={{ padding: '1rem' }}>
              <div className="skeleton" style={{ height: 18, width: '40%' }} />
              <div className="skeleton" style={{ height: 14, width: '60%', marginTop: 8 }} />
            </div>
          ))}
        </div>
      )}

      {orders && orders.length === 0 && (
        <div className="empty">
          <p>No orders yet.</p>
          <Link to="/" className="btn btn-primary">Start shopping</Link>
        </div>
      )}

      {orders && orders.length > 0 && (
        <div className="stack" style={{ marginTop: '1.5rem' }}>
          {orders.map(o => (
            <article key={o.id} className="card" style={{ padding: '1.25rem' }}>
              <div className="row between" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <strong>Order #{o.id}</strong>
                  <div className="muted" style={{ fontSize: '0.85rem' }}>
                    {new Date(o.created_at).toLocaleString()}
                    {o.payment_last4 && <> · •••• {o.payment_last4}</>}
                  </div>
                </div>
                <div className="row" style={{ gap: '1rem' }}>
                  <span className="badge badge-soft">{o.status || 'confirmed'}</span>
                  <strong>{money(o.total)}</strong>
                </div>
              </div>
              <div className="muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {o.items.length} {o.items.length === 1 ? 'item' : 'items'}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
