import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import ProductList from '../components/ProductList';
import { BASE_URL } from '../config';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const query = useQuery();
  const searchTerm = query.get('q');
  

  useEffect(() => {
    if (!searchTerm) return;

   fetch(`${BASE_URL}/api/products/?search=${encodeURIComponent(searchTerm)}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching search results:', err));
  }, [searchTerm]);

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
  };

  return (
    <Container sx={{ pt: '110px', pb: 4 }}>
      {/* Added paddingTop of 110px to push content below the header */}

      <Typography variant="h5" gutterBottom>
        Search results for: "{searchTerm}"
      </Typography>
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </Container>
  );
};

export default SearchPage;
