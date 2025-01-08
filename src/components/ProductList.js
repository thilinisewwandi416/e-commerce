import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { fetchProducts } from '../redux/actions';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles'; 
import VisibilityIcon from '@mui/icons-material/Visibility';
import Banner from './Banner';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const products = useSelector((state) => state.products);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); 

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleViewProduct = (id) => {
    navigate(`/product/${id}`); 
  };

  return (
    <>
      {!isSmallScreen && <Banner />} 
      <Box style={{ padding: '20px', backgroundColor: '#000', color: '#fff' }}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card style={{ backgroundColor: '#111', color: '#fff', position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={product.productImage}
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'contain', backgroundColor: '#000' }}
                />
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography variant="h6">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" style={{ margin: '10px 0', fontWeight: 'bold' }}>
                    {product.price} LKR
                  </Typography>
                  <Typography variant="body2" style={{ color: '#c7a533' }}>
                    IN STOCK
                  </Typography>
                </CardContent>
                <Box
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: '#e53935',
                      minWidth: '40px',
                      minHeight: '40px',
                      padding: 0,
                      margin: 0,
                      borderRadius: '0',
                    }}
                    onClick={() => handleViewProduct(product.id)} 
                  >
                    <VisibilityIcon style={{ color: '#fff' }} />
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProductList;
