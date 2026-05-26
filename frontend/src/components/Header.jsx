import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../lib/cart.jsx';
import { applyTheme } from '../lib/theme.js';
import { useState } from 'react';

export default function Header({ onOpenCart, theme, setTheme }) {
  const { count } = useCart();
  const [t, setLocal] = useState(theme);

  function toggleTheme() {
    const next = t === 'dark' ? 'light' : 'dark';
    setLocal(next);
    setTheme(next);
    applyTheme(next);
  }

  return (
    <header className="site-header">
      <div className="container inner">
        <Link to="/" className="brand" style={{ borderBottom: 'none' }}>
          <span className="mark">TS</span>
          <span>
            The Shop
            <small>IE BCSAI · DevOps</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Shop</NavLink>
          <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''}>Orders</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
        </nav>

        <div className="row" style={{ gap: '0.6rem' }}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title="Toggle theme"
          >
            {t === 'dark' ? '☀' : '☾'}
          </button>

          <button className="cart-button" onClick={onOpenCart} aria-label={`Cart, ${count} items`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M6 6L4 2H1" />
            </svg>
            <span>Cart</span>
            {count > 0 && <span className="count">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
