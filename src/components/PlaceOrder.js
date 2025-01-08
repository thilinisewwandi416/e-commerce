import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, Divider, Modal, Backdrop } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchCartItems, placeOrder } from '../redux/actions';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [isOrderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, cart]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    const orderDetails = {
      orderDate: new Date().toISOString(),
      items: cart.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: subtotal,
    };

    dispatch(placeOrder(orderDetails));
    setOrderConfirmed(true); 
  };

  const handleCloseModal = () => {
    setOrderConfirmed(false);
    navigate('/');
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
        Place Order
      </Typography>

      <Typography variant="h6" style={{ marginBottom: '10px' }}>
        Order Details
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <Box
          style={{
            backgroundColor: '#222',
            padding: '20px',
            borderRadius: '5px',
          }}
        >
          {cart.map((item) => (
            <Box
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                padding: '10px',
                backgroundColor: '#333',
                borderRadius: '5px',
              }}
            >
              <Box style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img
                  src={item.productImage}
                  alt={item.productName}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                  }}
                />
                <Box>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    {item.productName}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: '#c7a533', marginBottom: '5px' }}
                  >
                    Description
                  </Typography>
                  <Typography variant="body2" style={{ color: '#aaa' }}>
                    {item.productDescription}
                  </Typography>
                </Box>
              </Box>

              <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff' }}>
                  Rs {(item.price * item.quantity).toFixed(2)}
                </Typography>
                <Typography variant="body2" style={{ color: '#aaa' }}>
                  {item.quantity} Qty
                </Typography>
              </Box>
            </Box>
          ))}

          <Divider style={{ backgroundColor: '#444', margin: '20px 0' }} />
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Subtotal
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Rs {subtotal.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      )}

      <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#e53935',
            color: '#fff',
            padding: '10px 20px',
            fontWeight: 'bold',
          }}
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </Button>
      </Box>

      
      <Modal
        open={isOrderConfirmed}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#000',
            borderRadius: '10px',
            padding: '30px',
            textAlign: 'center',
            width: '400px',
          }}
        >
          <CheckCircle style={{ color: 'green', fontSize: '50px', marginBottom: '10px' }} />
          <Typography variant="h5" style={{ fontWeight: 'bold', color: '#fff' }}>
            Order Confirmed!
          </Typography>
          <Typography variant="body2" style={{ color: '#ccc', marginTop: '10px' }}>
            Your order has been placed successfully.
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#e53935',
              color: '#fff',
              marginTop: '20px',
              padding: '10px 20px',
            }}
            onClick={handleCloseModal}
          >
            Continue Shopping
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default PlaceOrder;
