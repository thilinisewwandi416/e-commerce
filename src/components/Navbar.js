import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Modal,
  Backdrop,
  Badge,
} from '@mui/material';
import { Menu, Search, ShoppingCart, Home, Close } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const closeSearch = () => setSearchOpen(false);

  const isRootPage = location.pathname === '/';

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: '#000',
        padding: '10px 0',
        borderBottom: location.pathname !== '/' ? '2px solid #fff' : 'none',
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isSmallScreen ? (
          <>
            <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IconButton
                edge="start"
                style={{ color: '#fff' }}
                onClick={toggleDrawer(true)}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" style={{ color: '#fff', fontWeight: 'bold' }}>
                E-Commerce
              </Typography>
            </Box>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
              <Box
                style={{
                  width: '250px',
                  backgroundColor: '#000',
                  color: '#fff',
                  height: '100%',
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  <ListItem button component={Link} to="/" style={{ color: '#fff' }}>
                    <Home style={{ marginRight: '10px', color: '#fff' }} />
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button component={Link} to="/products" style={{ color: '#fff' }}>
                    <ListItemText primary="Products" />
                  </ListItem>
                  <ListItem button component={Link} to="/about" style={{ color: '#fff' }}>
                    <ListItemText primary="About Us" />
                  </ListItem>
                  <ListItem button component={Link} to="/contact" style={{ color: '#fff' }}>
                    <ListItemText primary="Contact" />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
            <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isRootPage && (
                <IconButton style={{ color: '#fff' }} onClick={() => setSearchOpen(true)}>
                  <Search />
                </IconButton>
              )}
              <Box style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Badge badgeContent={totalItems} color="error">
                  <IconButton style={{ color: '#fff' }} onClick={handleCartClick}>
                    <ShoppingCart />
                  </IconButton>
                </Badge>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
              <Box
                style={{
                  backgroundColor: '#e53935',
                  borderRadius: '5px',
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton component={Link} to="/" style={{ color: '#fff' }}>
                  <Home />
                </IconButton>
              </Box>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                E-Commerce
              </Typography>
              <Box style={{ display: 'flex', gap: '15px' }}>
                <Typography style={{ cursor: 'pointer' }}>Products</Typography>
                <Typography style={{ cursor: 'pointer' }}>About Us</Typography>
                <Typography style={{ cursor: 'pointer' }}>Contact</Typography>
              </Box>
            </Box>
          <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: '5px',
            width: '100%',
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: '20px',
            height: '40px', 
            overflow: 'hidden', 
          }}
        >
          <InputBase
            placeholder="I'm looking for"
            style={{
              padding: '8px 12px',
              flex: 1,
              height: '100%', 
            }}
          />
          <Box
            style={{
              backgroundColor: '#e53935',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '100%', 
            }}
          >
            <IconButton style={{ color: '#fff' }}>
              <Search />
            </IconButton>
          </Box>
        </Box>

        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px', 
          }}
        >
          <Badge badgeContent={totalItems} color="error">
            <IconButton style={{ color: '#fff' }} onClick={handleCartClick}>
              <ShoppingCart />
            </IconButton>
          </Badge>
          {!isSmallScreen && (
            <Typography style={{ color: '#fff' }}>
              {totalPrice.toFixed(2)} LKR
            </Typography>
          )}
        </Box>

          </>
        )}
      </Toolbar>
      <Modal
        open={isSearchOpen}
        onClose={closeSearch}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '400px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: 24,
            padding: '16px',
          }}
        >
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <InputBase
              placeholder="Search..."
              style={{
                flex: 1,
                padding: '8px 16px',
              }}
            />
            <IconButton style={{ color: '#e53935' }} onClick={closeSearch}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Navbar;
