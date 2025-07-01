import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { BASE_URL } from '../config'; // <-- import your backend base URL here
const categories = [
  { label: 'Massage Oils', path: '/products/massage' },
  { label: 'Essential Oils', path: '/products/essential' },
  { label: 'Carrier Oils and Base Oils', path: '/products/carrier' },
  { label: 'Fragrance Oils', path: '/products/fragrance' },
  { label: 'Gallery', path: '/gallery' },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
      setSearchText('');
      setSearchOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        height: '70px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
          height: '70px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 !important',
        }}
      >
        {/* Logo */}
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', ml: -14 }}>
          <Box
            component="img"
           src="/assets/ETERNICA INVOICE LOGO 1.png"
            alt="Eternica Logo"
            sx={{  width: '250px',   // Increased from ~198px
      height: '70px', objectFit: 'contain' }}
          />
        </Box>

        {/* Categories */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '8px' }}>
          {categories.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Button
                key={label}
                component={Link}
                to={path}
                sx={{
                  minWidth: '106px',
                  height: '32px',
                  padding: '8px',
                  color: 'black',
                  backgroundColor: isActive ? '#f5f5f5' : 'transparent',
                  borderBottom: isActive ? '2px solid black' : 'none',
                  textTransform: 'none',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    borderBottom: '2px solid black',
                  },
                }}
              >
                {label}
              </Button>
            );
          })}
        </Box>

        {/* Search & Cart */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 } }}>
          {/* Search Field */}
          {searchOpen && (
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '20px',
                padding: '0 8px',
                mr: 1,
              }}
            >
              <InputBase
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoFocus
                sx={{ pl: 1, width: 180 }}
              />
              <IconButton type="submit" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
          )}

          {/* Search Icon Toggle */}
          {!searchOpen && (
            <IconButton onClick={() => setSearchOpen(true)} sx={{ color: 'black' }}>
              <SearchIcon sx={{ fontSize: 28 }} />
            </IconButton>
          )}

          {/* Cart Icon */}
          <IconButton component={Link} to="/cart" sx={{ color: 'black' }}>
            <ShoppingCartIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
