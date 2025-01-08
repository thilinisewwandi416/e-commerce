import React from 'react';
import { Box } from '@mui/material';
import homebanner from '../assets/homebanner.jpeg';

const Banner = () => {
  return (
    <Box
      style={{
        backgroundImage: `url(${homebanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '750px',
        width: '100%',
      }}
    />
  );
};

export default Banner;
