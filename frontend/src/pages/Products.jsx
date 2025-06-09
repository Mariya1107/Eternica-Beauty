import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import ProductList from '../components/ProductList';
import { BASE_URL } from '../config';
const formatCategoryForAPI = (cat) => {
  return cat
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Products = ({ cartItems, setCartItems }) => {
  const { category } = useParams();
  const location = useLocation();
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
    const formattedCategory = formatCategoryForAPI(category);
    const encodedCategory = encodeURIComponent(formattedCategory);

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products/?category=${encodedCategory}`);
        const data = await response.json();

        const query = new URLSearchParams(location.search);
        const nameQuery = query.get('name');

        if (nameQuery) {
          const filtered = data.filter(item =>
            item.name.toLowerCase() === nameQuery.toLowerCase()
          );
          setProducts(filtered);
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [category, location.search]);

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
