import React from 'react';
import { Box, Typography, Button } from '@mui/material';


const Home = () => {
  return (
    <Box sx={{ position: 'relative', mt: '60px', width: '100%' }}>
      {/* Hero Banner */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '300px', md: '540px' },
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/assets/eternica_banner 1.png"
          alt="Eternica Beauty Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
          }}
        />
      </Box>

      {/* Categories Section */}
      <Box
        sx={{
          width: '100%',
          height: '311px',
          backgroundColor: '#fff',
          px: { xs: 2, md: 4 },
          py: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#141414',
            mb: 4,
            ml: { xs: 2, md: 6 },
            textShadow: '2px 2px 4px rgba(0,0,0,0.25)',
          }}
        >
          Categories
        </Typography>

        <Box
          sx={{
            maxWidth: '1000px',
            mx: 'auto',
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 8, md: 20 },
            flexWrap: 'wrap',
          }}
        >
          {['Item 9.png', 'Item 10.png', 'Item 11.png', 'Item 12.png'].map((img, index) => (
            <Box key={index}>
              <Box
                component="img"
                src={`/assets/${img}`}
                alt={`Item ${index + 9}`}
                sx={{
                  width: '96px',
                  height: '136px',
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* About Section */}
      <Box
        sx={{
          width: '100%',
          height: '590px',
          backgroundColor: '#fdfdfd',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, md: 10 },
          py: 4,
          boxSizing: 'border-box',
          gap: { xs: 4, md: 8 },
          flexWrap: 'wrap',
        }}
      >
        {/* Left Image */}
        <Box
          component="img"
          src="/assets/Group 125.png"
          alt="About Eternica"
          sx={{
            width: '392.43px',
            height: '435px',
            objectFit: 'cover',
            borderRadius: 2,
            ml: { xs: 0, md: 2 },
          }}
        />

        {/* Right Content */}
        <Box sx={{ maxWidth: '600px', flex: 1, mt: { xs: 3, md: 0 } }}>
          {/* Heading Image */}
         {/* Heading Image */}
<Box
  component="img"
  src="/assets/text heading.png"
  alt="Eternica Heading"
  sx={{
    height: '50px',               // ✅ Set image height to 32px
    mb: 2,
    ml: { xs: 0, md: 3 },
    mt: { xs: 0, md: -4 },
  }}
/>

          {/* Subtext */}
          <Typography
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 500,
              fontSize: '19px',
              color: '#333',
              whiteSpace: 'pre-line',
              lineHeight: 1.6,
              ml: { xs: 0, md: 3 },
            }}
          >
            {`At Eternica Oils, we stand as a beacon of quality and integrity in the world of premium oil solutions. Proudly headquartered in the United Arab Emirates, our brand has become synonymous with natural excellence, serving clients across the GCC region with unwavering commitment and care.

We specialize in delivering high-quality, naturally sourced oils that meet the evolving needs of consumers and businesses alike. Whether it's for wellness, beauty, culinary, or industrial applications, Eternica Oils is trusted for its purity, performance, and consistency.`}
          </Typography>
        </Box>
      </Box>
       
    {/* Products Section */}
<Box
  sx={{
    width: '1200px',
    height: '538px',
    backgroundColor: '#fff',
    mx: 'auto', // Center horizontally
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between', // Distribute vertically
    py: 2,
    boxSizing: 'border-box',
  }}
>
  {/* Heading Image */}
  <Box
    component="img"
    src="/assets/Shop From Trending Products.png"
    alt="Products Heading"
    sx={{
      width: '360px',
      height: '30px',
    }}
  />

  <Box
  sx={{
    width: '360px',
    height: '3px', // Increased thickness (original was 1px)
    backgroundColor: '#141414', // Choose a bold/dark color
    mt: 2, 
    mb: 4,
  }}
/>
  {/* Product Cards */}
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      flexWrap: 'wrap',
      height: '100%', // Let it expand to available vertical space
      pb: 2,
    }}
  >
    {[1, 2, 3, 4].map((item, idx) => (
      <Box
        key={idx}
        sx={{
          position: 'relative',
          width: '200.66px',
          height: '268.39px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Background Rectangle */}
        <Box
          component="img"
          src="/assets/Rectangle 11.png"
          alt="Card Background"
          sx={{
            width: '200.66px',
            height: '268.39px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />

        {/* Product Image */}
        <Box
          component="img"
          src="/assets/OIL WITH STICKERS (2) 1.png"
          alt={`Product ${item}`}
          sx={{
            width: '120.75px',
            height: '161px',
            objectFit: 'cover',
            mt: 4,
            zIndex: 1,
          }}
        />

  {/* Product Name */}
    <Typography
  sx={{
    width: '158.15px',
    height: '18.66px',         // restoring original size if needed
    fontSize: '16px',
    color: '#141414',
    fontWeight: 500,
    fontFamily: '"Poppins", sans-serif',
    textAlign: 'center',
    mt: -2,                   // reduced from 1 to move it up
    zIndex: 1,
  }}
>
  Massage Oil
</Typography>

        {/* Add to Cart Button */}
        <Button
          sx={{
            width: '155.6px',
            height: '31.99px',
            borderRadius: '20px',
            backgroundColor: '#000',
            color: '#fff',
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            textTransform: 'none',
            zIndex: 2,
            mb: 2,
            '&:hover': {
              backgroundColor: '#222',
            },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    ))}
  </Box>
</Box>

{/* Trust Section */}
<Box
  sx={{
    width: '100%',
    height: '153px',
    backgroundColor: '#f3efff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Box
    sx={{
      width: '1200px',
      height: '153px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 4,
    }}
  >
    {/* Fast Delivery */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        component="img"
        src="/assets/Group.svg" // Replace with your actual icon
        alt="Fast Delivery"
        sx={{ width: '50px', height: '50px', color: '#000' }}
      />
      <Typography
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '18px',
          color: '#141414',
        }}
      >
        Fast Delivery
      </Typography>
    </Box>

    {/* 24hr Customer Support */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        component="img"
        src="/assets/24.png" // Replace with your actual icon
        alt="Customer Support"
        sx={{ width: '70px', height: '70px', color: '#000' }}
      />
      <Typography
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '18px',
          color: '#141414',
        }}
      >
        24/7 Customer Support
      </Typography>
    </Box>

    {/* 100% Authentic */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        component="img"
        src="/assets/authentic.jpg" // Replace with your actual icon
        alt="100% Authentic"
        sx={{ width: '35px', height: '40px', color: '#000' }}
      />
      <Typography
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '18px',
          color: '#141414',
        }}
      >
        100% Authentic
      </Typography>
    </Box>
  </Box>
</Box>
{/* Products Section */}
<Box
  sx={{
    width: '1200px',
    height: '882px',
    backgroundColor: '#fff',
    mx: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    py: 4,
    boxSizing: 'border-box',
  }}
>
  {/* Heading Image */}
  <Box
    component="img"
    src="/assets/Shop From Best Deals.png"
    alt="Products Heading"
    sx={{
      width: '300px',
      height: '30px',
    }}
  />

  {/* Bold Divider Line */}
  <Box
    sx={{
      width: '300px',
      height: '3px',
      backgroundColor: '#141414',
      mt: 2,
      mb: 2,
    }}
  />

  {/* Product Grid */}
  <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
      placeItems: 'center',
      gap: 5,
    }}
  >
    {[...Array(8)].map((_, idx) => (
      <Box
        key={idx}
        sx={{
          position: 'relative',
          width: '200.66px',
          height: '268.39px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Background Rectangle */}
        <Box
          component="img"
          src="/assets/Rectangle 11.png"
          alt="Card Background"
          sx={{
            width: '200.66px',
            height: '268.39px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />

        {/* Product Image */}
        <Box
          component="img"
          src="/assets/OIL WITH STICKERS (2) 1.png"
          alt={`Product ${idx + 1}`}
          sx={{
            width: '120.75px',
            height: '161px',
            objectFit: 'cover',
            mt: 4,
            zIndex: 1,
          }}
        />

        {/* Product Name */}
        <Typography
          sx={{
            width: '158.15px',
            height: '18.66px',
            fontSize: '16px',
            color: '#141414',
            fontWeight: 500,
            fontFamily: '"Poppins", sans-serif',
            textAlign: 'center',
            mt: -2,
            zIndex: 1,
          }}
        >
          Massage Oil
        </Typography>

        {/* Add to Cart Button */}
        <Button
          sx={{
            width: '155.6px',
            height: '31.99px',
            borderRadius: '20px',
            backgroundColor: '#000',
            color: '#fff',
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            textTransform: 'none',
            zIndex: 2,
            mb: 2,
            '&:hover': {
              backgroundColor: '#222',
            },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    ))}
  </Box>
</Box>

    </Box>
  );
};

export default Home;
