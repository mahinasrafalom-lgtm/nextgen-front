import { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Cart from './components/Cart.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Consultation from './pages/Consultation.jsx';
import ConsultationApply from './pages/ConsultationApply.jsx';
import ConsultationTicket from './pages/ConsultationTicket.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import { fallbackProducts } from './data/products.js';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState(fallbackProducts);
  const updateProducts = useCallback((nextProducts) => { if (nextProducts?.length) setProducts(nextProducts); }, []);
  return (
    <div className="min-h-screen">
      <Navbar products={products} onOpenCart={() => setCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home onProducts={updateProducts} />} />
        <Route path="/shop" element={<Shop onProducts={updateProducts} />} />
        <Route path="/product/:id" element={<ProductDetail onProducts={updateProducts} />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/consultation/apply" element={<ProtectedRoute><ConsultationApply /></ProtectedRoute>} />
        <Route path="/consultation/ticket/:id" element={<ProtectedRoute><ConsultationTicket /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="*" element={<Home onProducts={updateProducts} />} />
      </Routes>
      <Footer />
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
