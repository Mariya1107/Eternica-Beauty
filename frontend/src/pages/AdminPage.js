import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Typography, TextField, Button, Alert,
} from '@mui/material';
import { BASE_URL } from '../config';

const AdminPage = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!loginUsername || !loginPassword) {
      setError('Please fill in all login fields.');
      return;
    }

    try {
       const response = await axios.post(`${BASE_URL}/api/admin/login/`, {
        username: loginUsername, // use username here
        password: loginPassword,
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;

      navigate('/admin-dashboard');
    } catch (err) {
      console.error('Admin login error:', err.response ? err.response.data : err.message);
      setError('Invalid login credentials or not an admin.');
    }
  };

  return (
    <Box
      sx={{
        paddingTop: '94px',
        minHeight: '100vh',
        backgroundColor: '#f9f5f2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          bgcolor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          mb={3}
          sx={{
            fontFamily: "'Yeseva One', serif",
            fontWeight: 'bold',
            color: '#6f1904',
            textAlign: 'center',
          }}
        >
          Admin Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" noValidate autoComplete="off" onSubmit={handleLoginSubmit}>
          <TextField
            label="Admin Username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            InputLabelProps={{ style: { color: '#8f2e08' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#8f2e08',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6f1904',
                },
              },
              input: {
                color: '#6f1904',
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            InputLabelProps={{ style: { color: '#8f2e08' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#8f2e08',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6f1904',
                },
              },
              input: {
                color: '#6f1904',
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#6f1904',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#6f1904',
                boxShadow: 'none',
              },
              fontFamily: "'Yeseva One', serif",
              fontWeight: 'bold',
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPage;
