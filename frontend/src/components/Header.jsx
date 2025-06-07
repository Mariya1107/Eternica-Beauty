// Header.js (only the changed part shown)

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

const hoverStyle = {
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // white translucent
  },
};

const Header = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4a148c', mb: 4 }}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Eternica Beauty
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'white', borderRadius: 1, px: 1 }}>
          <InputBase
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ color: 'black', width: 200 }}
          />
          <IconButton onClick={handleSearch} sx={hoverStyle}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
          <Button color="inherit" component={Link} to="/products/essential" sx={hoverStyle}>Essential Oils</Button>
          <Button color="inherit" component={Link} to="/products/carrier" sx={hoverStyle}>Carrier Oils</Button>
          <Button color="inherit" component={Link} to="/products/fragrance" sx={hoverStyle}>Fragrance Oils</Button>
          <Button color="inherit" component={Link} to="/products/massage" sx={hoverStyle}>Massage Oils</Button>
          <IconButton component={Link} to="/gallery" color="inherit" sx={hoverStyle}>
            <PhotoLibraryIcon />
          </IconButton>
          <IconButton component={Link} to="/cart" color="inherit" sx={hoverStyle}>
            <ShoppingCartIcon />
          </IconButton>
          <Button color="inherit" component={Link} to="/track-order" sx={hoverStyle}>Track Order</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
