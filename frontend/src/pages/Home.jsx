import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Eternica Beauty
      </Typography>
      <Typography variant="body1">
        Discover our premium collection of essential oils, carrier oils, and more.
      </Typography>
    </Container>
  );
};

export default Home;