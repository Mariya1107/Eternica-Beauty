// Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

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
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
          <Button color="inherit" component={Link} to="/products/essential">Essential Oils</Button>
          <Button color="inherit" component={Link} to="/products/carrier">Carrier Oils</Button>
          <Button color="inherit" component={Link} to="/products/fragrance">Fragrance Oils</Button>
          <Button color="inherit" component={Link} to="/products/massage">Massage Oils</Button>
          <IconButton component={Link} to="/gallery" color="inherit">
            <PhotoLibraryIcon />
          </IconButton>
          <IconButton component={Link} to="/cart" color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <Button color="inherit" component={Link} to="/track-order">Track Order</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
