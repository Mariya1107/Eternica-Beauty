import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { BASE_URL } from '../config'; // <-- import your backend base URL here

const TopHeader = () => (
  <AppBar
    position="fixed"
    sx={{
      backgroundColor: '#6f1904',
      top: 0,
      zIndex: 1400,
      height: 30,
      justifyContent: 'flex-start',
      paddingLeft: 2,
    }}
    elevation={0}
  >
    <Toolbar
      variant="dense"
      sx={{
        minHeight: 30,
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 4,
        color: 'white',
        fontSize: '0.85rem',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <EmailIcon sx={{ fontSize: 16 }} />
        <Typography>contact@eternicabeauty.com</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <PhoneIcon sx={{ fontSize: 16 }} />
        <Typography>+91 9876543210</Typography>
      </Box>
    </Toolbar>
  </AppBar>
);

const Header = () => {
  const [search, setSearch] = useState('');
  const [categoriesData, setCategoriesData] = useState({});
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // For account dropdown menu
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const accountMenuOpen = Boolean(accountAnchorEl);

  const navigate = useNavigate();
  const location = useLocation();

  // Example: get token from localStorage if you use one
  const token = localStorage.getItem('authToken'); // change if your token key is different

  const categories = [
    { key: 'essential', label: 'Essential Oils' },
    { key: 'carrier', label: 'Carrier Oils' },
    { key: 'fragrance', label: 'Fragrance Oils' },
    { key: 'massage', label: 'Massage Oils' },
  ];

  const fetchCategoryItems = async (categoryKey) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/products/?category=${categoryKey}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setCategoriesData((prev) => ({ ...prev, [categoryKey]: data }));
    } catch (err) {
      console.error('Fetch error:', err);
      setCategoriesData((prev) => ({ ...prev, [categoryKey]: [] }));
    }
    setLoading(false);
  };

  const handleMenuToggle = (event, categoryKey) => {
    if (currentCategory === categoryKey) {
      setMenuAnchorEl(null);
      setCurrentCategory(null);
    } else {
      setMenuAnchorEl(event.currentTarget);
      setCurrentCategory(categoryKey);
      if (!categoriesData[categoryKey]) {
        fetchCategoryItems(categoryKey);
      }
    }
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setCurrentCategory(null);
  };

  // Account menu handlers
  const handleAccountClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  const handleAccountMenuItemClick = (path) => {
    setAccountAnchorEl(null);
    navigate(path);
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  useEffect(() => {
    if (
      [
        '/',
        '/products/essential',
        '/products/carrier',
        '/products/fragrance',
        '/products/massage',
      ].includes(location.pathname)
    ) {
      setSearch('');
    }
  }, [location.pathname]);

  return (
    <>
      <TopHeader />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(111, 25, 4, 0.4)',
          backdropFilter: 'blur(5px)',
          zIndex: 1300,
          top: 30,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {/* Logo */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Yeseva One', serif",
              lineHeight: 1,
              userSelect: 'none',
              textAlign: 'center',
              display: 'inline-block',
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                sx={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}
              >
                Eternica
              </Box>
              <Box
                sx={{
                  fontSize: '1.8rem',
                  mt: '-0.4rem',
                  mx: 'auto',
                  width: 'max-content',
                  letterSpacing: 1,
                }}
              >
                Beauty
              </Box>
            </Link>
          </Typography>

          {/* Navigation & Controls */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mt: { xs: 2, sm: 0 },
            }}
          >
            {categories.map(({ key, label }) => (
              <Box key={key}>
                <Button
                  color="inherit"
                  onClick={(e) => handleMenuToggle(e, key)}
                  endIcon={<ArrowDropDownIcon sx={{ fontSize: 20 }} />}
                  sx={{
                    textTransform: 'none',
                    fontFamily: "'Yeseva One', serif",
                    fontSize: '1.1rem',
                  }}
                >
                  {label}
                </Button>
                <Menu
                  anchorEl={menuAnchorEl}
                  open={currentCategory === key}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  PaperProps={{ sx: { bgcolor: '#8f2e08', color: 'white' } }}
                  MenuListProps={{ onMouseLeave: handleMenuClose }}
                >
                  <MenuItem component={Link} to={`/products/${key}`} onClick={handleMenuClose}>
                    View All {label}
                  </MenuItem>
                  <Divider sx={{ bgcolor: 'white' }} />
                  {loading ? (
                    <MenuItem>
                      <CircularProgress size={20} sx={{ color: 'white' }} />
                    </MenuItem>
                  ) : categoriesData[key]?.length ? (
                    categoriesData[key].map((item) => (
                      <MenuItem
                        key={item.id}
                        component={Link}
                        to={`/products/${key}?name=${encodeURIComponent(item.name)}`}
                        onClick={handleMenuClose}
                      >
                        {item.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No items found</MenuItem>
                  )}
                </Menu>
              </Box>
            ))}

            <IconButton component={Link} to="/gallery" color="inherit" sx={{ fontSize: 24 }}>
              <PhotoLibraryIcon sx={{ fontSize: 24 }} />
            </IconButton>

            <IconButton component={Link} to="/cart" color="inherit" sx={{ fontSize: 24 }}>
              <ShoppingCartIcon sx={{ fontSize: 24 }} />
            </IconButton>

            {/* Search + Track Order + Account */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {/* Search */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 1,
                  px: 1,
                }}
              >
                <InputBase
                  placeholder="Search products…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  sx={{ color: 'black', width: 160 }}
                />
                <IconButton onClick={handleSearch} size="small">
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Track Order and Account Icon */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  height: '100%',
                }}
              >
                <Button
                  color="inherit"
                  component={Link}
                  to="/track-order"
                  sx={{
                    fontFamily: "'Yeseva One', serif",
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    px: 2,
                    py: '4px',
                    borderRadius: '8px',
                    backgroundColor: 'black',
                    minHeight: '28px',
                    width: 'auto',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Track Order
                </Button>

                {/* Account Icon Button with Dropdown */}
                <IconButton
                  aria-controls={accountMenuOpen ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={accountMenuOpen ? 'true' : undefined}
                  onClick={handleAccountClick}
                  sx={{
                    color: 'black',
                    ml: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 28 }} />
                </IconButton>

                <Menu
                  id="account-menu"
                  anchorEl={accountAnchorEl}
                  open={accountMenuOpen}
                  onClose={handleAccountClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{ sx: { bgcolor: '#8f2e08', color: 'white', minWidth: 140 } }}
                  MenuListProps={{ onMouseLeave: handleAccountClose }}
                >
                  <MenuItem
                    onClick={() => handleAccountMenuItemClick('/user')}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    User
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleAccountMenuItemClick('/admin')}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    Admin
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
