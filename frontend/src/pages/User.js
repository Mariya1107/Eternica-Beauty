import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
} from '@mui/material';

const User = () => {
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);

  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setLoginError('');
    setRegError('');
    setRegSuccess('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginEmail, password: loginPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        alert('Login successful!');
        navigate('/'); // Redirect to home page after login
      } else {
        setLoginError(data.detail || 'Login failed');
      }
    } catch (err) {
      setLoginError('Network error');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (regPassword !== regConfirmPassword) {
      setRegError("Passwords don't match");
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: regEmail,
          email: regEmail,
          password: regPassword,
          first_name: regName,
        }),
      });
      if (res.ok) {
        setRegSuccess('Registration successful! You can now login.');
        setRegName('');
        setRegEmail('');
        setRegPassword('');
        setRegConfirmPassword('');
      } else {
        const data = await res.json();
        setRegError(JSON.stringify(data));
      }
    } catch (err) {
      setRegError('Network error');
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
          maxWidth: 400,
          bgcolor: 'white',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          centered
          TabIndicatorProps={{
            style: { backgroundColor: '#6f1904' },
          }}
          sx={{
            mb: 3,
            '& .MuiTab-root': {
              fontFamily: "'Yeseva One', serif",
              fontWeight: 'bold',
              color: '#8f2e08',
              textTransform: 'none',
              fontSize: '1.1rem',
              transition: 'none',
              '&:hover': {
                color: '#8f2e08',
                backgroundColor: 'transparent', // no hover bg color
              },
              '&.Mui-selected': {
                color: '#6f1904',
                backgroundColor: 'transparent', // no selected bg color
              },
              '&.Mui-focusVisible': {
                backgroundColor: 'transparent', // no focus bg color
              },
            },
          }}
        >
          <Tab disableRipple label="Login" />
          <Tab disableRipple label="Register" />
        </Tabs>

        {tabIndex === 0 && (
          <Box component="form" noValidate autoComplete="off" onSubmit={handleLoginSubmit}>
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
              Login to your account
            </Typography>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: '#8f2e08' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8f2e08',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6f1904',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6f1904',
                  },
                },
                input: {
                  color: '#6f1904',
                },
              }}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: '#8f2e08' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8f2e08',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6f1904',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6f1904',
                  },
                },
                input: {
                  color: '#6f1904',
                },
              }}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            {loginError && (
              <Typography color="error" variant="body2" mt={1}>
                {loginError}
              </Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: '#6f1904',
                '&:hover': { backgroundColor: '#6f1904' }, // no color change on hover
                boxShadow: 'none', // remove shadow on click
                fontFamily: "'Yeseva One', serif",
                fontWeight: 'bold',
              }}
              disableRipple
              type="submit"
            >
              Login
            </Button>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box component="form" noValidate autoComplete="off" onSubmit={handleRegisterSubmit}>
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
              Create a new account
            </Typography>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: '#8f2e08' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8f2e08',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6f1904',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6f1904',
                  },
                },
                input: {
                  color: '#6f1904',
                },
              }}
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: '#8f2e08' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8f2e08',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6f1904',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6f1904',
                  },
                },
                input: {
                  color: '#6f1904',
                },
              }}
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: '#8f2e08' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8f2e08',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6f1904',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6f1904',
                  },
                },
                input: {
                  color: '#6f1904',
                },
              }}
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: '#8f2e08' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8f2e08',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6f1904',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6f1904',
                  },
                },
                input: {
                  color: '#6f1904',
                },
              }}
              value={regConfirmPassword}
              onChange={(e) => setRegConfirmPassword(e.target.value)}
            />
            {regError && (
              <Typography color="error" variant="body2" mt={1}>
                {regError}
              </Typography>
            )}
            {regSuccess && (
              <Typography color="primary" variant="body2" mt={1}>
                {regSuccess}
              </Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: '#6f1904',
                '&:hover': { backgroundColor: '#6f1904' }, // no hover color change
                boxShadow: 'none',
                fontFamily: "'Yeseva One', serif",
                fontWeight: 'bold',
              }}
              disableRipple
              type="submit"
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default User;
