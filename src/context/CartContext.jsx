import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const initialState = { items: JSON.parse(localStorage.getItem('petcare_cart') || '[]') };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((item) => item._id === action.product._id);
      const items = existing ? state.items.map((item) => item._id === action.product._id ? { ...item, qty: item.qty + action.qty } : item) : [...state.items, { ...action.product, qty: action.qty }];
      return { ...state, items };
    }
    case 'QTY': return { ...state, items: state.items.map((item) => item._id === action.id ? { ...item, qty: Math.max(1, action.qty) } : item) };
    case 'REMOVE': return { ...state, items: state.items.filter((item) => item._id !== action.id) };
    case 'CLEAR': return { ...state, items: [] };
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => localStorage.setItem('petcare_cart', JSON.stringify(state.items)), [state.items]);
  const value = useMemo(() => ({
    items: state.items,
    count: state.items.reduce((sum, item) => sum + item.qty, 0),
    total: state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    addItem: (product, qty = 1) => dispatch({ type: 'ADD', product, qty }),
    updateQty: (id, qty) => dispatch({ type: 'QTY', id, qty }),
    removeItem: (id) => dispatch({ type: 'REMOVE', id }),
    clearCart: () => dispatch({ type: 'CLEAR' })
  }), [state.items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};
