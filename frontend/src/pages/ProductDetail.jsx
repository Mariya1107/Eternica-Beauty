import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
  Paper,
  Divider,
  Stack,
} from '@mui/material';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const backendUrl = 'http://127.0.0.1:8000';

  useEffect(() => {
    fetch(`${backendUrl}/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  if (!product) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress size={50} />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: '#fafafa',
          maxWidth: 900,
          margin: 'auto',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Image Left */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                maxHeight: 280,
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}
            />
          </Grid>

          {/* Details Right */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="700" gutterBottom color="black">
              {product.name}
            </Typography>

            <Typography
              variant="h6"
              sx={{ mb: 1, display: 'inline-block', mr: 2 }}
              color="black"
            >
              ₹{product.price.toLocaleString()}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: product.in_stock ? 'green' : 'red',
                fontWeight: '600',
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            >
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              <Typography variant="body1" color="black" fontWeight="600">
                Brand: <Typography component="span" fontWeight="normal" color="black">{product.brand}</Typography>
              </Typography>

              <Typography variant="body1" color="black" fontWeight="600">
                Quantity: <Typography component="span" fontWeight="normal" color="black">{product.quantity}</Typography>
              </Typography>

              <Typography variant="body1" whiteSpace="pre-line" sx={{ mt: 2 }} color="black">
                <strong>Advantages:</strong>{'\n'}
                {product.advantages}
              </Typography>

              <Typography variant="body1" whiteSpace="pre-line" sx={{ mt: 2 }} color="black">
                <strong>How to Use:</strong>{'\n'}
                {product.how_to_use}
              </Typography>
            </Stack>

            <Button
  variant="contained"
  disabled={!product.in_stock}
  onClick={() => onAddToCart && onAddToCart(product)}  // already correct ✅
  sx={{
    mt: 4,
    px: 5,
    py: 1.25,
    fontWeight: '700',
    backgroundColor: '#4a148c',
    '&:hover': { backgroundColor: '#2a0057' },
    borderRadius: 2,
  }}
>
  Add to Cart
</Button>

          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail;
