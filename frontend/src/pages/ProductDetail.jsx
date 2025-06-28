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
import ProductCard from '../components/ProductCard'; 
import { BASE_URL } from '../config';
const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedQty, setSelectedQty] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedQty('');
        fetch(`${BASE_URL}/api/products/${data.id}/related/`)
          .then((res) => res.json())
          .then((related) => setRelatedProducts(related))
          .catch((err) => console.error('Error fetching related products:', err));
      })
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  if (!product) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Box sx={{ pt: '110px', pb: 6, px: 2 }}>
      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: '529px',
              height: '585px',
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              ml: { md: -20 },
              mb: 4,
            }}
          />

          <Box sx={{ width: '100%', mt: 10, mb: 10 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Product Information
            </Typography>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Poppins', border: '1px solid #ccc' }}>
              <tbody>
                <tr><td style={tdStyle}>Product Name</td><td style={tdStyle}>{product.name}</td></tr>
                <tr><td style={tdStyle}>Size</td><td style={tdStyle}>{product.quantity}</td></tr>
                <tr><td style={tdStyle}>Brand</td><td style={tdStyle}>{product.brand}</td></tr>
                <tr><td style={tdStyle}>Category</td><td style={tdStyle}>{product.category_name || 'Oil'}</td></tr>
              </tbody>
            </table>
          </Box>

          <Box sx={{ mt: -5 }}>
            <Typography variant="h6" fontWeight={200} gutterBottom>
              Safety Information
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              {product.safety_information?.split('\n').filter(line => line.trim() !== '').map((point, idx) => (
                <li key={idx} style={{ marginBottom: 6 }}>{point}</li>
              ))}
            </Box>
          </Box>

          {relatedProducts.length > 0 && (
            <Box sx={{ mt: 6, width: '100%' }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Related Products
              </Typography>
              <Grid container spacing={2}>
  {relatedProducts.map((item) => (
    <Grid item xs={12} sm={6} md={6} key={item.id}>
      <ProductCard product={item} onAddToCart={onAddToCart} />
    </Grid>
  ))}
</Grid>

            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={6} sx={{ ml: { md: 20 } }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h4" fontWeight={700} color="#000">{product.name}</Typography>
              <Box sx={{ backgroundColor: product.in_stock ? '#CFF7D3' : '#FDDCDC', color: product.in_stock ? '#02542A' : '#8B0000', px: 1.5, py: 0.2, borderRadius: '10px', fontWeight: 600, fontSize: '13px', fontFamily: 'Poppins' }}>{product.in_stock ? 'In Stock' : 'Out of Stock'}</Box>
            </Box>

            <Box sx={{ backgroundColor: '#CFF7D3', color: '#02542A', width: '120px', textAlign: 'center', py: 0.3, borderRadius: '5px', fontWeight: 600, fontSize: 14, fontFamily: 'Poppins' }}>{product.brand}</Box>

            <Typography variant="h5" fontWeight={600} color="#000" sx={{ mt: 2 }}>₹{product.price.toLocaleString()}</Typography>

            <Box>
              <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#000', mb: 1 }}>Advantages</Typography>
              <Box component="ul" sx={{ pl: 2, color: '#000', mt: 1 }}>
                {product.advantages?.split('\n').filter(line => line.trim() !== '').map((point, index) => (
                  <li key={index} style={{ fontFamily: 'Poppins', marginBottom: '6px' }}>{point}</li>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#000', mb: 1 }}>Quantity</Typography>
              <Select
                value={selectedQty}
                displayEmpty
                onChange={(e) => setSelectedQty(e.target.value)}
                sx={{ width: '350px', height: '50px', backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #ccc', fontFamily: 'Poppins', fontSize: 14, pl: 2 }}
                renderValue={(selected) => !selected ? <span style={{ color: '#888' }}>Select Quantity</span> : selected}
              >
                <MenuItem value="" disabled hidden>Select Quantity</MenuItem>
                {[...Array(product.quantity).keys()].map((i) => (
                  <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                ))}
              </Select>
            </Box>

        <Button
  variant="contained"
  disabled={!product.in_stock}
  onClick={() => onAddToCart && onAddToCart({ ...product, selectedQty })}
  sx={{
    mt: 2,
    px: 4,
    py: 1.5,
    fontWeight: 'bold',
    fontSize: '16px',
    backgroundColor: '#000',
    '&:hover': { backgroundColor: '#11111' },
    width: '350px',
    height: '50px',
    borderRadius: '20px',
  }}
>
  Add to Cart
</Button>

{/* Add space below button */}
<Box sx={{ height: 30 }} />


            {product.available_quantities && (
              <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {product.available_quantities.split(',').map((qty, index) => (
                  <Box key={index} sx={{ px: 6, py: 2, borderRadius: '10px', border: '1px solid #ccc', backgroundColor: '#f4f4f4', fontFamily: 'Poppins', fontSize: 14, fontWeight: 500, color: '#333' }}>{qty.trim()}</Box>
                ))}
              </Box>
            )}

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>How to Use</Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                {product.how_to_use?.split('\n').filter(line => line.trim() !== '').map((point, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>{point}</li>
                ))}
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Ingredients</Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                {product.ingredients?.split('\n').filter(line => line.trim() !== '').map((point, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>{point}</li>
                ))}
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const tdStyle = { fontWeight: 600, padding: '8px', border: '1px solid #ccc' };

export default ProductDetail;
