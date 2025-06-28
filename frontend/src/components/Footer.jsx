import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <Box
  sx={{
    backgroundColor: '#FAEDAA',
    color: 'black',
    height: '500px', // 👈 SET FIXED HEIGHT
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between', // Distributes top and bottom sections evenly
    width: '100%',
    py: 4,
  }}
>

      {/* Top section: centered width */}
      <Box
        sx={{
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/assets/Text Content Heading.png"
          alt="Text Heading"
          sx={{
            width: '262px',
            height: '61px',
            objectFit: 'contain',
            mb: 3,
          }}
        />

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 4,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <TextField
            placeholder="Enter your Gmail"
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: 'white',
              borderRadius: '4px',
              flexGrow: 1,
              maxWidth: '370px',
              input: { padding: '8px 12px' },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '20px',
              width: '77px',
              height: '40px',
              fontSize: '14px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#222',
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>

      {/* Bottom section: 3-column layout */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1000px',
          mt: 2,
          gap: 8,
        }}
      >
{/* Left: Logo + tagline + small logos */}
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mt: 2, // Adjusts vertical placement of the entire left block
  }}
>
  <Box
    component="img"
    src="/assets/ETERNICA INVOICE LOGO 1.png"
    alt="Eternica Logo"
    sx={{
      width: '141.38px',
      height: '39.16px',
      objectFit: 'contain',
    }}
  />
  <Typography variant="body2" sx={{ fontSize: '14px', mt: 2 }}>
    Elevate your senses<br />with natural luxury.
  </Typography>

{/* Small logos under the text */}
<Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2, // spacing between logos
    mt: 1,
  }}
>
  {[
    { src: '/assets/1.png', link: 'https://example.com/1' },
    { src: '/assets/2.png', link: 'https://example.com/2' },
    { src: '/assets/3.png', link: 'https://example.com/3' },
    { src: '/assets/4.png', link: 'https://example.com/4' },
  ].map((item, index) => (
    <Box
      key={index}
      component="a"
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ display: 'inline-block' }}
    >
      <Box
        component="img"
        src={item.src}
        alt={`Small Logo ${index + 1}`}
        sx={{
          width: '16.71px',
          height: '14.71px',
          objectFit: 'contain',
        }}
      />
    </Box>
  ))}
</Box>

</Box>


        {/* Center: Quick Links */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography
            sx={{
              fontSize: '18px',
              fontFamily: 'Poppins',
              fontWeight: 600,
              mb: 0,
              width: '129.33px',
              height: '35.72px',
              textAlign: 'center',
            }}
          >
            Quick Links
          </Typography>
          {[
            { label: 'Essential Oils', category: 'essential' },
            { label: 'Fragrance Oils', category: 'fragrance' },
            { label: 'Carrier Oils and Base Oils', category: 'carrier' },
          ].map((item) => (
            <Typography
              key={item.category}
              onClick={() => handleNavigation(item.category)}
              sx={{
                
                fontSize: '14px',
                cursor: 'pointer',
                mb: 1,
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>

        {/* Right: Contact Info */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            sx={{
              fontSize: '18px',
              fontFamily: 'Poppins',
              fontWeight: 600,
              mb: 0,
              width: '129.33px',
              height: '35.72px',
            }}
          >
            Contact Info
          </Typography>
          <Typography sx={{ fontSize: '14px',  mb: 1 }}>
            Eternica Beauty - Store 7,
          </Typography>
          <Typography sx={{ fontSize: '14px',  mb: 1 }}>
            Plot 15 - M - 17 - Abu Dhabi
          </Typography>
          <Typography sx={{ fontSize: '14px'}}>
            United Arab Emirates
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
