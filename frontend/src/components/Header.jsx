import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../lib/cart.jsx';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Header({ onOpenCart }) {
  const { count } = useCart();

  return (
    <header className="site-header">
      <div className="container inner">
        <Link to="/" className="brand" style={{ borderBottom: 'none' }}>
          <span className="mark"><Logo size={26} /></span>
          <span className="wordmark">
            <span>THE SHOP</span>
            <small>IE BCSAI · DevOps</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Shop</NavLink>
          <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''}>Orders</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
        </nav>

        <div className="row" style={{ gap: '0.6rem' }}>
          <ThemeToggle />
          <button className="cart-button" onClick={onOpenCart} aria-label={`Cart, ${count} items`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M6 6L4 2H1" />
            </svg>
            <span>Cart</span>
            <span className="count">{count}</span>
          </button>
        </div>
      </div>
      <div className="accent-stripe" aria-hidden="true" />
    </header>
  );
}
