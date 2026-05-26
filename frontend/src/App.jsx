import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header        from './components/Header.jsx';
import Footer        from './components/Footer.jsx';
import CartDrawer    from './components/CartDrawer.jsx';
import ApiBadge      from './components/ApiBadge.jsx';

import Home              from './pages/Home.jsx';
import Product           from './pages/Product.jsx';
import Checkout          from './pages/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Orders            from './pages/Orders.jsx';
import About             from './pages/About.jsx';

import { getInitialTheme, applyTheme } from './lib/theme.js';

// Apply theme before first paint
const initialTheme = getInitialTheme();
applyTheme(initialTheme);

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [theme,    setTheme]    = useState(initialTheme);
  const openCart = () => setCartOpen(true);

  return (
    <>
      <Header onOpenCart={openCart} theme={theme} setTheme={setTheme} />
      <main>
        <Routes>
          <Route path="/"             element={<Home     onOpenCart={openCart} />} />
          <Route path="/product/:id"  element={<Product  onOpenCart={openCart} />} />
          <Route path="/checkout"     element={<Checkout />} />
          <Route path="/order/:id"    element={<OrderConfirmation />} />
          <Route path="/orders"       element={<Orders />} />
          <Route path="/about"        element={<About />} />
          <Route path="*"             element={
            <div className="container empty" style={{ padding: '4rem 0' }}>
              <h2>Page not found</h2>
              <p>That URL isn't part of The Shop.</p>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ApiBadge />
    </>
  );
}
