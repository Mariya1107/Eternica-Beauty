import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Box,
  Button,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = ({ cartItems, setCartItems }) => {
  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleIncrement = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * item.quantity,
    0
  );

  return (
    <Box sx={{ paddingTop: '110px', paddingBottom: '40px' }}>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
            }}
          >
            {/* Items List */}
            <List sx={{ flex: 2 }}>
              {cartItems.map(item => (
                <React.Fragment key={item.id}>
                  <ListItem
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 2,
                      boxShadow: 1,
                      borderRadius: 2,
                      padding: 2,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 100, height: 100 }}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary={<Typography variant="h6">{item.name}</Typography>}
                      secondary={
                        <>
                          <Typography variant="subtitle1" sx={{ mt: 1 }}>
                            Price: ₹{(Number(item.price) || 0).toFixed(2)}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mt: 1,
                              gap: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleDecrement(item.id)}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography>{item.quantity}</Typography>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleIncrement(item.id)}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
                            Subtotal: ₹{((Number(item.price) || 0) * item.quantity).toFixed(2)}
                          </Typography>
                        </>
                      }
                    />

                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="error"
                      onClick={() => handleRemove(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>

            {/* Summary Box */}
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 2,
                height: 'fit-content',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Total Price: ₹{totalPrice.toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#4a148c',
                  '&:hover': { backgroundColor: '#38006b' },
                  mt: 3,
                }}
                onClick={() => alert('Checkout feature coming soon!')}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
