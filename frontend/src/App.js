import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    navigate('/cart');
  };

  return (
    <>
      <ScrollToTop offset={120} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products/:category"
          element={<Products cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/search"
          element={<SearchPage cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/gallery"
          element={<GalleryPage cartItems={cartItems} setCartItems={setCartItems} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
