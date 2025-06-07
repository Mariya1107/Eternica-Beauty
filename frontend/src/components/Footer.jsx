import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#4a148c', color: 'white', p: 3, mt: 'auto' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Eternica Beauty
      </Typography>
      <Typography variant="subtitle1" align="center" component="p">
        enquiry@eternicabeauty.com
      </Typography>
      <Typography variant="subtitle1" align="center" component="p">
        +9083664376
      </Typography>
      <Typography variant="subtitle1" align="center" component="p">
        +07483653658
      </Typography>
    </Box>
  );
};

export default Footer;