import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { addToCart, fetchProductById } from '../redux/actions'; 

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.selectedProduct);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchProductById(id)); 
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: 0, 
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1, 
      };
      dispatch(addToCart(cartItem)); 
    }
  };

  if (!product) {
    return (
      <Box
        sx={{
          padding: '20px',
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ color: '#e53935' }}>
          Loading Product...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      
      <Box
        sx={{
          flex: 1,
          maxWidth: isSmallScreen ? '100%' : '500px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src={product.productImage}
          alt={product.name}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '10px',
           
          }}
        />
      </Box>

    
      <Box
        sx={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          textAlign: isSmallScreen ? 'center' : 'left',
          padding: isSmallScreen ? '20px' : '0',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '1.8rem' : '2.5rem' }}>
          {product.name}
        </Typography>
        <Typography variant="h5" sx={{ margin: '10px 0', color: '#ccc',fontWeight: 'bold', fontSize: isSmallScreen ? '1rem' : '1.5rem' }}>
         {product.price} LKR
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '13px', color: '#94948e', lineHeight: 1.6 }}>
          <strong>Description </strong>
          <br></br>
          {product.description}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1rem',
            color: product.quantityInStock > 0 ? 'yellow' : 'red',
          }}
        >
          {product.quantityInStock > 0
            ? `${product.quantityInStock} In Stock`
            : 'Out of Stock'}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#e53935',
            color: '#fff',
          
            fontSize: '10px',
            fontWeight: 'bold',
            alignSelf: isSmallScreen ? 'center' : 'flex-start',
          }}
          onClick={handleAddToCart}
          disabled={product.quantityInStock === 0}
        >
          <ShoppingCart sx={{ marginRight: '10px' }} />
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
