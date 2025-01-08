
export const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';


export const fetchProducts = () => ({ type: FETCH_PRODUCTS });

export const fetchProductById = (id) => ({
  type: FETCH_PRODUCT,
  payload: id,
});

export const fetchCartItems = () => ({ type: FETCH_CART_ITEMS });

export const addToCart = (cartItem) => ({
  type: ADD_TO_CART,
  payload: cartItem,
});

export const updateCartItem = (cartItemId, quantity) => ({
  type: UPDATE_CART_ITEM,
  payload: { cartItemId, quantity },
});

export const deleteCartItem = (cartItemId) => ({
  type: DELETE_CART_ITEM,
  payload: cartItemId,
});

export const placeOrder = (orderDetails) => ({
  type: PLACE_ORDER,
  payload: orderDetails,
});
