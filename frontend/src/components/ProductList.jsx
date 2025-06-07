import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item key={product.id} xs={12} sm={4} md={3}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
