// GalleryPage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ProductList from '../components/ProductList'; // Use ProductList
import { useNavigate } from 'react-router-dom';

const GalleryPage = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const backendUrl = 'http://127.0.0.1:8000';
  const navigate = useNavigate();  // ✅ Needed for redirect

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    navigate('/cart'); // ✅ Redirect to cart after adding
  };

  useEffect(() => {
    fetch(`${backendUrl}/api/products/`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
    
      </Typography>
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </Container>
  );
};

export default GalleryPage;
