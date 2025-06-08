import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';

const AdminPage = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all login fields.');
      return;
    }
    console.log('Logging in:', { loginEmail, loginPassword });
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
            label="Admin Email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
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
