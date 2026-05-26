import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import { CartProvider } from './lib/cart.jsx';
import { getInitialTheme, applyTheme } from './lib/theme.js';

import './styles/global.css';
import './styles/app.css';

// Apply the persisted (or OS-preferred) theme before React's first paint so
// the page never flashes the wrong scheme.
applyTheme(getInitialTheme());

// When the site is served from a GitHub Pages sub-path the router needs to
// know the basename so links and history work correctly.
const basename = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename || '/'}>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
