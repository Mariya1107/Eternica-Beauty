// src/components/ProductGrid.js
import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.length === 0 ? (
        <Typography sx={{ padding: 2 }}>No products found.</Typography>
      ) : (
        products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image || 'https://via.placeholder.com/300'}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description?.substring(0, 60)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/product/${product.id}`}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ProductGrid;
