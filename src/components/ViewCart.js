import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, useMediaQuery } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { fetchCartItems, updateCartItem, deleteCartItem } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const ViewCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateCartItem(cartItemId, newQuantity));
    }
  };

  const handleRemoveItem = (cartItemId) => {
    dispatch(deleteCartItem(cartItemId));
  };

  return (
    <Box
      style={{
        padding: '20px',
        backgroundColor: '#000',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" style={{ color: '#c7a533' }}>Your cart is empty.</Typography>
      ) : (
        <>
          <Box style={{ marginBottom: '20px' }}>
            <Button
              style={{
                color: '#c7a533',
                textTransform: 'none',
                fontWeight: 'bold',
              }}
              onClick={() => navigate('/')}
            >
              &lt; Continue Shopping
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Item</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Qty</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                          }}
                        />
                        <Typography variant="body1" style={{ color: '#fff' }}>
                          {item.productName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell style={{ color: '#fff' }}>{item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.quantity}
                        inputProps={{ min: 1, style: { color: '#fff', textAlign: 'center' } }}
                        style={{
                          backgroundColor: '#333',
                          borderRadius: '5px',
                          width: '60px',
                        }}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      />
                    </TableCell>
                    <TableCell style={{ color: '#fff' }}>
                      {(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRemoveItem(item.id)}
                        style={{ color: '#e53935' }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            style={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              justifyContent: isSmallScreen ? 'center' : 'flex-end',
              alignItems: 'center',
              marginTop: '20px',
              gap: isSmallScreen ? '15px' : '0',
            }}
          >
            <Typography
              variant="h6"
              style={{
                marginRight: isSmallScreen ? '0' : '250px',
                fontWeight: 'bold',
                textAlign: isSmallScreen ? 'center' : 'right',
              }}
            >
              Subtotal: {subtotal.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#e53935',
                color: '#fff',
                fontWeight: 'bold',
                width: isSmallScreen ? '100%' : 'auto',
              }}
              onClick={() => navigate('/place-order')}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ViewCart;
