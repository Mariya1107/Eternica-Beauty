import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import ProductList from '../components/ProductList';

const formatCategoryForAPI = (cat) => {
  return cat
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Products = ({ cartItems, setCartItems }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const backendUrl = 'http://127.0.0.1:8000';
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

    navigate('/cart'); // Navigate to cart page immediately after adding
  };

  useEffect(() => {
    const formattedCategory = formatCategoryForAPI(category);
    const encodedCategory = encodeURIComponent(formattedCategory);

    fetch(`${backendUrl}/api/products/?category=${encodedCategory}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, [category]);

  return (
    <Box sx={{ paddingTop: '110px', paddingBottom: '40px' }}>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {category.charAt(0).toUpperCase() + category.slice(1)} Oils
        </Typography>
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </Container>
    </Box>
  );
};

export default Products;
