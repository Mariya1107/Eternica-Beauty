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
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <EmailIcon sx={{ fontSize: 18 }} />
        <Typography>contact@eternicabeauty.com</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <PhoneIcon sx={{ fontSize: 18 }} />
        <Typography>+91 9876543210</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <PhoneIcon sx={{ fontSize: 18 }} />
        <Typography>+91 9123456780</Typography>
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

  const navigate = useNavigate();
  const location = useLocation();
  const backendUrl = 'http://127.0.0.1:8000';

  const fetchCategoryItems = async (categoryKey) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/products/?category=${encodeURIComponent(categoryKey)}`);
      const data = await response.json();
      setCategoriesData((prev) => ({ ...prev, [categoryKey]: data }));
    } catch (error) {
      console.error('Error fetching category items:', error);
      setCategoriesData((prev) => ({ ...prev, [categoryKey]: [] }));
    }
    setLoading(false);
  };

  const categories = [
    { key: 'essential', label: 'Essential Oils' },
    { key: 'carrier', label: 'Carrier Oils' },
    { key: 'fragrance', label: 'Fragrance Oils' },
    { key: 'massage', label: 'Massage Oils' },
  ];

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

  useEffect(() => {
    const pathsToReset = [
      '/',
      '/products/essential',
      '/products/carrier',
      '/products/fragrance',
      '/products/massage',
    ];
    if (pathsToReset.includes(location.pathname)) {
      setSearch('');
    }
  }, [location.pathname]);

  const secondHeaderBg = 'rgba(111, 25, 4, 0.4)';
  const firstHeaderBgLighter = '#8f2e08';

  const hoverStyle = {
    fontFamily: "'Yeseva One', serif",
    fontSize: '1.1rem',
    lineHeight: 1.2,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: secondHeaderBg,
    },
  };

  const iconButtonStyle = {
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    '&:hover': {
      backgroundColor: secondHeaderBg,
    },
  };

  return (
    <>
      <TopHeader />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: secondHeaderBg,
          backdropFilter: 'blur(5px)',
          zIndex: 1300,
          top: 30,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: "'Yeseva One', serif",
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                whiteSpace: 'pre-line',
                display: 'inline-block',
              }}
            >
              Eternica{'\n'}Beauty
            </Link>
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {categories.map(({ key, label }) => (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  color="inherit"
                  onClick={(e) => handleMenuToggle(e, key)}
                  sx={{
                    ...hoverStyle,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.3,
                    paddingY: '3px',
                  }}
                >
                  {label}
                  <ArrowDropDownIcon sx={{ fontSize: '1.3rem', ml: 0.3 }} />
                </Button>
                <Menu
                  id="category-menu"
                  anchorEl={menuAnchorEl}
                  open={currentCategory === key}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  MenuListProps={{ onMouseLeave: handleMenuClose }}
                  PaperProps={{
                    sx: {
                      bgcolor: firstHeaderBgLighter,
                      color: 'white',
                      minWidth: 180,
                      mt: '10px',
                      position: 'fixed',
                      zIndex: 2000,
                      '& .MuiMenuItem-root': {
                        fontFamily: "'Yeseva One', serif",
                        fontSize: '1.1rem',
                        '&:hover': {
                          backgroundColor: secondHeaderBg,
                        },
                      },
                    },
                  }}
                >
                  <MenuItem
                    component={Link}
                    to={`/products/${key}`}
                    onClick={handleMenuClose}
                  >
                    View All {label}
                  </MenuItem>
                  <Divider sx={{ my: 0.5, bgcolor: 'white' }} />
                  {loading && currentCategory === key ? (
                    <MenuItem>
                      <CircularProgress size={24} sx={{ color: 'white' }} />
                    </MenuItem>
                  ) : categoriesData[key] && categoriesData[key].length > 0 ? (
                    categoriesData[key].map((item) => (
                      <MenuItem
                        key={item.id}
                        component={Link}
                        to={`/product/${item.id}`}
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

            <IconButton component={Link} to="/gallery" aria-label="Gallery" sx={iconButtonStyle}>
              <PhotoLibraryIcon fontSize="large" />
            </IconButton>

            <IconButton component={Link} to="/cart" aria-label="Cart" sx={iconButtonStyle}>
              <ShoppingCartIcon fontSize="large" />
            </IconButton>

            {/* Search + Track Order Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                minWidth: 180,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'white',
                  borderRadius: 1,
                  px: 1,
                  width: '100%',
                }}
              >
                <InputBase
                  placeholder="Search products…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  sx={{ color: 'black', width: '100%' }}
                />
                <IconButton onClick={handleSearch} size="small" sx={{ p: 0.5 }}>
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Box>

              <Button
                color="inherit"
                component={Link}
                to="/track-order"
                sx={{
                  fontFamily: "'Yeseva One', serif",
                  fontSize: '1rem',
                  textTransform: 'none',
                  px: 2,
                  py: '4px',
                  borderRadius: '8px',
                  backgroundColor: 'black',
                  minHeight: '28px',
                  width: 'auto',
                  alignSelf: 'center',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  whiteSpace: 'nowrap',
                }}
              >
                Track Order
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
