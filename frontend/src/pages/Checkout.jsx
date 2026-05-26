import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../lib/cart.jsx';
import { currentUser, placeOrder } from '../lib/api.js';
import { money } from '../lib/theme.js';

// ----- Card-input helpers (pure, no PSP) --------------------------------

function formatCardNumber(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(raw) {
  const d = raw.replace(/\D/g, '').slice(0, 4);
  if (d.length < 3) return d;
  return `${d.slice(0,2)}/${d.slice(2)}`;
}
// Luhn check — same algorithm any real PSP runs.
function luhnOk(num) {
  const s = num.replace(/\s/g, '');
  if (s.length < 13) return false;
  let sum = 0, alt = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let n = +s[i];
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n; alt = !alt;
  }
  return sum % 10 === 0;
}
function detectBrand(num) {
  const n = num.replace(/\s/g, '');
  if (/^4/.test(n))          return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(n)) return 'Mastercard';
  if (/^3[47]/.test(n))      return 'Amex';
  if (/^6(011|5)/.test(n))   return 'Discover';
  return 'Card';
}

// ----- Page -------------------------------------------------------------

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, shipping, tax, total, clear } = useCart();
  const user = currentUser();

  const [form, setForm] = useState({
    name:    user?.name  || '',
    email:   user?.email || '',
    address: '',
    city:    '',
    zip:     '',
    country: 'Spain',
    number:  '',
    expiry:  '',
    cvc:     '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState(null);

  if (items.length === 0) {
    return (
      <div className="form-page">
        <div className="card center" style={{ padding: '3rem' }}>
          <h2>Your cart is empty</h2>
          <p className="muted">Add a few items first, then come back to check out.</p>
          <Link to="/" className="btn btn-primary">Browse The Shop</Link>
        </div>
      </div>
    );
  }

  function update(field, value) { setForm(f => ({ ...f, [field]: value })); }

  function validate() {
    if (!form.name || !form.email || !form.address || !form.city || !form.zip) {
      return 'Please fill in your shipping details.';
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'That email looks off.';
    if (!luhnOk(form.number))               return 'Card number failed Luhn check.';
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) return 'Expiry must be MM/YY.';
    if (!/^\d{3,4}$/.test(form.cvc))         return 'CVC must be 3 or 4 digits.';
    return null;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError(null); setSubmitting(true);

    // Artificial latency so the spinner actually feels like a payment call.
    await new Promise(r => setTimeout(r, 800));

    try {
      const order = await placeOrder({
        items: items.map(l => ({ product_id: l.id, qty: l.qty, price: l.price })),
        total,
        shipping: {
          name: form.name, email: form.email,
          address: form.address, city: form.city, zip: form.zip, country: form.country,
        },
        payment: { number: form.number, brand: detectBrand(form.number) },
        token: user?.token,
      });
      clear();
      navigate(`/order/${order.id}`, { state: { order } });
    } catch (err) {
      setError(err.message || 'Could not place order.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container" style={{ padding: '2.5rem 0' }}>
      <h1>Checkout</h1>
      <p className="muted" style={{ marginTop: '-0.4rem' }}>
        No real card is charged — this is a class project demo.
      </p>

      <form
        onSubmit={onSubmit}
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '2rem',
          marginTop: '2rem',
        }}
      >
        <div className="card" style={{ padding: '2rem' }}>
          <h3>Shipping</h3>
          <div className="stack">
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="address">Street address</label>
              <input id="address" value={form.address} onChange={e => update('address', e.target.value)} />
            </div>
            <div className="split">
              <div className="field">
                <label htmlFor="city">City</label>
                <input id="city" value={form.city} onChange={e => update('city', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="zip">Postal code</label>
                <input id="zip" value={form.zip} onChange={e => update('zip', e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="country">Country</label>
              <select id="country" value={form.country} onChange={e => update('country', e.target.value)}>
                <option>Spain</option><option>Portugal</option><option>France</option>
                <option>Germany</option><option>United Kingdom</option><option>United States</option>
              </select>
            </div>
          </div>

          <h3 style={{ marginTop: '2rem' }}>Payment</h3>

          <div className="card-preview" aria-hidden="true">
            <div className="chip" />
            <div className="number">
              {form.number ? form.number.padEnd(19, '•') : '•••• •••• •••• ••••'}
            </div>
            <div className="meta-row">
              <div>Card holder<strong>{form.name || 'YOUR NAME'}</strong></div>
              <div>Expires<strong>{form.expiry || 'MM/YY'}</strong></div>
              <div>{detectBrand(form.number)}</div>
            </div>
          </div>

          <div className="stack" style={{ marginTop: '1.25rem' }}>
            <div className="field">
              <label htmlFor="number">Card number</label>
              <input
                id="number"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                value={form.number}
                onChange={e => update('number', formatCardNumber(e.target.value))}
              />
            </div>
            <div className="split">
              <div className="field">
                <label htmlFor="expiry">Expiry</label>
                <input
                  id="expiry"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={e => update('expiry', formatExpiry(e.target.value))}
                />
              </div>
              <div className="field">
                <label htmlFor="cvc">CVC</label>
                <input
                  id="cvc"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  maxLength={4}
                  value={form.cvc}
                  onChange={e => update('cvc', e.target.value.replace(/\D/g,''))}
                />
              </div>
            </div>
            <p className="muted" style={{ fontSize: '0.8rem', margin: 0 }}>
              Tip: <span className="mono">4242 4242 4242 4242</span> · any future date · any CVC.
            </p>
          </div>

          {error && (
            <p style={{ color: 'var(--ie-red)', marginTop: '1rem' }}>{error}</p>
          )}
        </div>

        <aside className="card" style={{ padding: '1.5rem', alignSelf: 'start', position: 'sticky', top: '90px' }}>
          <h3>Order summary</h3>
          <div className="stack" style={{ gap: '0.6rem' }}>
            {items.map(l => (
              <div key={l.id} className="row between" style={{ fontSize: '0.92rem' }}>
                <span>{l.qty} × {l.name}</span>
                <span>{money(l.price * l.qty)}</span>
              </div>
            ))}
          </div>
          <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '1rem 0' }} />
          <div className="stack" style={{ gap: '0.4rem' }}>
            <div className="row between"><span className="muted">Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="row between"><span className="muted">Shipping</span><span>{shipping === 0 ? 'Free' : money(shipping)}</span></div>
            <div className="row between"><span className="muted">Tax (4%)</span><span>{money(tax)}</span></div>
          </div>
          <div className="row between" style={{
            fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem'
          }}>
            <span>Total</span><span>{money(total)}</span>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
            style={{ marginTop: '1.5rem', width: '100%' }}
          >
            {submitting ? 'Processing payment…' : `Pay ${money(total)}`}
          </button>
          <p className="muted center" style={{ fontSize: '0.75rem', marginTop: '0.75rem' }}>
            🔒 Payment is simulated. No card details leave your browser.
          </p>
        </aside>
      </form>

      <style>{`
        @media (max-width: 900px) {
          form { grid-template-columns: 1fr !important; }
          aside { position: static !important; }
        }
      `}</style>
    </div>
  );
}
