import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleMoreDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        backgroundColor: '#e0e0e0', 
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.05)',
          backgroundColor: '#d6d6d6', 
          boxShadow: 6,
        },
      }}
    >
      {product.image && (
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
        />
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom>{product.name}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{product.description}</Typography>

        {/* Price and stock inline */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
            ₹{product.price}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: product.in_stock ? 'green' : 'red',
              fontWeight: 'bold'
            }}
          >
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </Typography>
        </Box>

        {/* Buttons stack */}
        <Stack direction="column" spacing={1}>
          <Button
            variant="outlined"
            sx={{
              color: '#000',
              borderColor: '#000',
              '&:hover': {
                backgroundColor: '#000',
                color: 'white',
                borderColor: '#000',
              },
            }}
            onClick={handleMoreDetails}
          >
            More Details
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              '&:hover': {
                backgroundColor: '#1a1a1a',
              },
            }}
            onClick={() => onAddToCart(product)}
            disabled={!product.in_stock}
          >
            Add to Cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
