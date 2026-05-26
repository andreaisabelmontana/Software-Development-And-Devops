import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const LS_KEY = 'shop.cart';

const CartCtx = createContext(null);

function read() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch { return []; }
}
function write(items) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(items)); } catch {}
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.find(l => l.id === action.product.id);
      if (existing) {
        return state.map(l => l.id === action.product.id
          ? { ...l, qty: l.qty + (action.qty || 1) }
          : l);
      }
      return [...state, { ...action.product, qty: action.qty || 1 }];
    }
    case 'remove':
      return state.filter(l => l.id !== action.id);
    case 'setQty':
      return state.map(l => l.id === action.id
        ? { ...l, qty: Math.max(1, action.qty) }
        : l);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, read);

  useEffect(() => { write(items); }, [items]);

  const value = useMemo(() => {
    const count = items.reduce((n, l) => n + l.qty, 0);
    const subtotal = items.reduce((n, l) => n + l.price * l.qty, 0);
    // Flat shipping over a $50 threshold — matches a typical e-commerce rule.
    const shipping = items.length === 0 ? 0 : (subtotal >= 50 ? 0 : 4.99);
    const tax = +(subtotal * 0.04).toFixed(2);    // 4% example sales tax
    const total = +(subtotal + shipping + tax).toFixed(2);
    return {
      items, count, subtotal, shipping, tax, total,
      add:    (product, qty) => dispatch({ type: 'add', product, qty }),
      remove: (id)            => dispatch({ type: 'remove', id }),
      setQty: (id, qty)       => dispatch({ type: 'setQty', id, qty }),
      clear:  ()              => dispatch({ type: 'clear' }),
    };
  }, [items]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const v = useContext(CartCtx);
  if (!v) throw new Error('useCart() used outside <CartProvider>');
  return v;
}
