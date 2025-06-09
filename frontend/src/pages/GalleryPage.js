import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ProductList from '../components/ProductList';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
const GalleryPage = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
 
  const navigate = useNavigate();

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

    navigate('/cart');
  };

  useEffect(() => {
   fetch(`${BASE_URL}/api/products/`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <Box sx={{ paddingTop: '110px', paddingBottom: '40px' }}>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Products
        </Typography>
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </Container>
    </Box>
  );
};

export default GalleryPage;
