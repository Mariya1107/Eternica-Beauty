import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, MenuItem,
  Grid, Paper, Divider, Tabs, Tab,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, CircularProgress
} from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

import { BASE_URL } from '../config';

const categories = [
  { value: 1, label: 'Essential Oils' },
  { value: 2, label: 'Carrier Oils' },
  { value: 3, label: 'Fragrance Oils' },
  { value: 4, label: 'Massage Oils' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    quantity: '',
    advantages: '',
    safety_information: '',
    ingredients: '',
    how_to_use: '',
    price: '',
    category: '',
    image: null,
    in_stock: true,
  });

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [editProduct, setEditProduct] = useState(null);
  const [editProductData, setEditProductData] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/users/`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));

    axios.get(`${BASE_URL}/api/products/`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [refresh]);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
    setProductData({
      name: '',
      brand: '',
      quantity: '',
      advantages: '',
      safety_information: '',
      ingredients: '',
      how_to_use: '',
      price: '',
      category: '',
      image: null,
      in_stock: true,
    });
    setEditProduct(null);
    setEditProductData(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setProductData(prev => ({
      ...prev,
      image: e.target.files[0] || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData.category) {
      alert('Please select a category.');
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === 'image' && !value) return;
        formData.append(key, value);
      });

      await axios.post(`${BASE_URL}/api/products/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Product added successfully!');
      setRefresh(prev => !prev);
      setProductData({
        name: '',
        brand: '',
        quantity: '',
        advantages: '',
        safety_information: '',
        ingredients: '',
        how_to_use: '',
        price: '',
        category: '',
        image: null,
        in_stock: true,
      });
      setActiveTab(2);
    } catch (error) {
      console.error('Add product error:', error);
      if (error.response) {
        alert(`Failed to add product: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else {
        alert('Failed to add product. Check console for details.');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this product?')) return;
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}/`);
      setRefresh(prev => !prev);
    } catch (err) {
      console.error(err);
      alert('Failed to delete product');
    }
  };

  const handleOpenEdit = (product) => {
    setEditProduct(product);
    setEditProductData({
      name: product.name,
      brand: product.brand,
      quantity: product.quantity,
      advantages: product.advantages,
      safety_information: product.safety_information,
      ingredients: product.ingredients,
      how_to_use: product.how_to_use,
      price: product.price,
      category: product.category,
      in_stock: product.in_stock,
      image: null,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditFileChange = (e) => {
    setEditProductData(prev => ({
      ...prev,
      image: e.target.files[0] || null,
    }));
  };

  const handleEditSubmit = async () => {
    if (!editProduct) return;
    setEditLoading(true);

    try {
      const formData = new FormData();
      Object.entries(editProductData).forEach(([key, value]) => {
        if (key === 'image' && !value) return;
        formData.append(key, value);
      });

      await axios.patch(`${BASE_URL}/api/products/${editProduct.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Product updated!');
      setRefresh(prev => !prev);
      setEditProduct(null);
    } catch (err) {
      console.error('Edit product error:', err);
      alert('Failed to update product');
    } finally {
      setEditLoading(false);
    }
  };

  const handleCloseEdit = () => {
    setEditProduct(null);
    setEditProductData(null);
  };

  return (
    <Box sx={{ paddingTop: '110px', paddingBottom: '40px' }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Yeseva One', serif",
          mb: 3,
          textAlign: 'center',
          color: '#6f1904',
          textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        Admin Dashboard
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="admin dashboard tabs"
        variant="fullWidth"
        sx={{
          mb: 3,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          color: '#6f1904',
          '& .MuiTab-root': {
            fontWeight: 'bold',
            fontFamily: "'Yeseva One', serif",
            color: '#6f1904',
          },
          '& .Mui-selected': {
            color: '#a52a0c',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#a52a0c',
          },
        }}
      >
        <Tab label="Add Product" />
        <Tab label="Registered Users" />
        <Tab label="Product List" />
      </Tabs>

      {activeTab === 0 && (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 700, margin: 'auto', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontFamily: "'Yeseva One', serif", mb: 2, color: '#6f1904' }}>
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" name="name" label="Name" required value={productData.name} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="brand" label="Brand" required value={productData.brand} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="quantity" label="Quantity" required value={productData.quantity} onChange={handleChange} />
            <TextField fullWidth margin="normal" name="advantages" label="Advantages" value={productData.advantages} onChange={handleChange} multiline rows={2} />
             <TextField fullWidth margin="normal" name="safety_information" label="Safety Information" value={productData.safety_information} onChange={handleChange} multiline rows={2} />
             <TextField fullWidth margin="normal" name="ingredients" label="Ingredients" value={productData.ingredients} onChange={handleChange} multiline rows={2} />
            <TextField fullWidth margin="normal" name="how_to_use" label="How to Use" value={productData.how_to_use} onChange={handleChange} multiline rows={2} />
            <TextField fullWidth margin="normal" name="price" label="Price" type="number" required value={productData.price} onChange={handleChange} />
            <TextField select fullWidth margin="normal" name="category" label="Category" required value={productData.category} onChange={handleChange}>
              {categories.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </TextField>

            <Box sx={{ mt: 1, mb: 2 }}>
              <Button variant="contained" component="label" fullWidth sx={{ mb: 1, backgroundColor: '#6f1904' }}>
                Upload Image
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>
              {productData.image && (
                <Typography variant="body2" sx={{ color: 'green' }}>
                  Selected file: {productData.image.name}
                </Typography>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <label style={{ color: '#6f1904' }}>
                <input type="checkbox" name="in_stock" checked={productData.in_stock} onChange={handleChange} />{' '}
                In Stock
              </label>
            </Box>

            <Button variant="contained" fullWidth type="submit" sx={{ backgroundColor: '#6f1904', fontFamily: "'Yeseva One', serif" }}>
              Add Product
            </Button>
          </form>
        </Paper>
      )}

      {activeTab === 1 && (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: 'auto', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontFamily: "'Yeseva One', serif", mb: 2, color: '#6f1904' }}>
            Registered Users
          </Typography>
          {users.length === 0 && <Typography>No users found.</Typography>}
          {users.map(user => (
            <Box key={user.id} sx={{ mb: 1 }}>
              <Typography variant="body1" sx={{ color: '#6f1904' }}>{user.email}</Typography>
              <Divider sx={{ mb: 1 }} />
            </Box>
          ))}
        </Paper>
      )}

      {activeTab === 2 && (
        <Box maxWidth="lg" sx={{ margin: 'auto' }}>
          <Grid container spacing={3}>
            {products.length === 0 && <Typography variant="body1" sx={{ mx: 2 }}>No products available.</Typography>}

            {products.map(product => (
              <Grid gridColumn="span 5" key={product.id}>
                <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 2 }}
                  />
                  <Typography variant="h6" sx={{ mt: 1, color: '#6f1904' }}>{product.name}</Typography>
                  <Typography sx={{ color: '#6f1904' }}>Brand: {product.brand}</Typography>
                  <Typography sx={{ color: '#6f1904' }}>Price: ₹{product.price}</Typography>
                  <Typography sx={{ color: '#6f1904' }}>Quantity: {product.quantity}</Typography>
                  <Typography sx={{ color: '#6f1904' }}>Status: {product.in_stock ? 'In Stock' : 'Out of Stock'}</Typography>

                  <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Button size="small" variant="outlined" onClick={() => handleOpenEdit(product)} sx={{ color: '#6f1904', borderColor: '#6f1904' }}>
                      More Details
                    </Button>

                    <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Dialog open={!!editProduct} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: '#6f1904', fontFamily: "'Yeseva One', serif" }}>
          Edit Product
          <IconButton
            aria-label="close"
            onClick={handleCloseEdit}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {editProductData ? (
            <>
              <TextField fullWidth margin="normal" label="Name" name="name" value={editProductData.name} onChange={handleEditChange} required />
              <TextField fullWidth margin="normal" label="Brand" name="brand" value={editProductData.brand} onChange={handleEditChange} required />
              <TextField fullWidth margin="normal" label="Quantity" name="quantity" value={editProductData.quantity} onChange={handleEditChange} required />
              <TextField fullWidth margin="normal" label="Advantages" name="advantages" value={editProductData.advantages} onChange={handleEditChange} multiline rows={2} />
              <TextField
  fullWidth
  margin="normal"
  label="Safety Information"
  name="safety_information"
  value={editProductData.safety_information || ''}
  onChange={handleEditChange}
  multiline
  rows={2}
/>

             <TextField
  fullWidth
  margin="normal"
  label="Ingredients"
  name="ingredients"
  value={editProductData.ingredients || ''}
  onChange={handleEditChange}
  multiline
  rows={2}
/>

              <TextField fullWidth margin="normal" label="How to Use" name="how_to_use" value={editProductData.how_to_use} onChange={handleEditChange} multiline rows={2} />
              <TextField fullWidth margin="normal" label="Price" name="price" type="number" value={editProductData.price} onChange={handleEditChange} required />
              <TextField select fullWidth margin="normal" label="Category" name="category" value={editProductData.category} onChange={handleEditChange} required>
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </TextField>

              <Box sx={{ mt: 1, mb: 2 }}>
                <Button variant="contained" component="label" fullWidth sx={{ mb: 1, backgroundColor: '#6f1904' }}>
                  Change Image
                  <input type="file" hidden accept="image/*" onChange={handleEditFileChange} />
                </Button>
                {editProductData.image && typeof editProductData.image === 'object' && (
                  <Typography variant="body2" sx={{ color: 'green' }}>
                    Selected file: {editProductData.image.name}
                  </Typography>
                )}
                {editProduct && (!editProductData.image || typeof editProductData.image === 'string') && (
  <Box
    component="img"
    src={editProduct.image}
    alt={editProduct.name}
    sx={{ width: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 2 }}
  />
)}

              </Box>

              <Box sx={{ mb: 2 }}>
                <label style={{ color: '#6f1904' }}>
                  <input type="checkbox" name="in_stock" checked={editProductData.in_stock} onChange={handleEditChange} />{' '}
                  In Stock
                </label>
              </Box>
            </>
          ) : (
            <CircularProgress />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEdit} disabled={editLoading}>Cancel</Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            sx={{ backgroundColor: '#6f1904', fontFamily: "'Yeseva One', serif" }}
            disabled={editLoading}
          >
            {editLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
