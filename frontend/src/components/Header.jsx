// Header.js
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

  const navigate = useNavigate();
  const location = useLocation();
  const backendUrl = 'http://127.0.0.1:8000';

  const categories = [
    { key: 'essential', label: 'Essential Oils' },
    { key: 'carrier', label: 'Carrier Oils' },
    { key: 'fragrance', label: 'Fragrance Oils' },
    { key: 'massage', label: 'Massage Oils' },
  ];

  const fetchCategoryItems = async (categoryKey) => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/products/?category=${categoryKey}`);
      const data = await res.json();
      setCategoriesData((prev) => ({ ...prev, [categoryKey]: data }));
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  };

  const handleMenuToggle = (event, categoryKey) => {
    if (menuAnchorEl && currentCategory === categoryKey) {
      handleMenuClose();
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
        <Toolbar sx={{ justifyContent: 'space-between' }}>
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {categories.map(({ key, label }) => (
              <Box key={key}>
                <Button
                  color="inherit"
                  aria-controls={currentCategory === key ? 'category-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={currentCategory === key ? 'true' : undefined}
                  onClick={(e) => handleMenuToggle(e, key)}
                  endIcon={<ArrowDropDownIcon sx={{ fontSize: 20 }} />}
                  sx={{
                    textTransform: 'none',
                    fontFamily: "'Yeseva One', serif",
                    fontSize: '1.1rem',
                    fontWeight: location.pathname.includes(`/products/${key}`)
                      ? 'bold'
                      : 'normal',
                    borderBottom: location.pathname.includes(`/products/${key}`)
                      ? '2px solid white'
                      : 'none',
                  }}
                >
                  {label}
                </Button>
                <Menu
                  id="category-menu"
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
                        key={`${key}-${item.id}`}
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

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
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
