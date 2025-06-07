import React from 'react';
import { Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ position: 'relative', mt: '60px' }}> {/* Increased top margin */}
      {/* Background Image */}
      <img
        src="/assets/home.jpg"
        alt="Eternica Beauty Banner"
        style={{
          width: '100vw',
          height: '90vh',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Text overlay on right side */}
      <Box
        sx={{
          position: 'absolute',
          top: '60%', // shifted slightly more downward
          right: '5%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          padding: 3,
          borderRadius: 4,
          maxWidth: '40%',
          textAlign: 'left',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontFamily: "'Yeseva One', serif", color: '#4a148c' }}
        >
           Eternica Beauty
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
          Discover our premium collection of essential oils, carrier oils, and more.
          Feel the essence of nature, curated to enhance your beauty and wellness.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
