import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box style={{ backgroundColor: '#000', color: '#fff', padding: '10px 0', textAlign: 'center',borderTop: '2px solid #e3e3e2',  }}>
      <Typography>CONNECT WITH US</Typography>
      <div>
        <IconButton color="inherit"><Facebook /></IconButton>
        <IconButton color="inherit"><Instagram /></IconButton>
        <IconButton color="inherit"><WhatsApp /></IconButton>
      </div>
    </Box>
  );
};

export default Footer;
