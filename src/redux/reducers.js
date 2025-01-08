const initialState = {
  products: [],
  selectedProduct: null,
  cart: [],
  order: null,
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, products: action.payload };
    case 'FETCH_PRODUCT_SUCCESS':
      return { ...state, selectedProduct: action.payload };
    case 'FETCH_CART_ITEMS_SUCCESS':
      return { ...state, cart: action.payload };
    case 'ADD_TO_CART_SUCCESS':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'UPDATE_CART_ITEM_SUCCESS':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.cartItemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'DELETE_CART_ITEM_SUCCESS':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case 'PLACE_ORDER_SUCCESS':
      return { ...state, order: action.payload, cart: [] };
    case 'FETCH_PRODUCT_FAILURE':
    case 'FETCH_PRODUCTS_FAILURE':
    case 'ADD_TO_CART_FAILURE':
    case 'UPDATE_CART_ITEM_FAILURE':
    case 'DELETE_CART_ITEM_FAILURE':
    case 'FETCH_CART_ITEMS_FAILURE':
    case 'PLACE_ORDER_FAILURE':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default rootReducer;
