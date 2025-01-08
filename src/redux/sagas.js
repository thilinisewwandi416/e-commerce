import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5132';


function* fetchProductsSaga() {
  try {
    const response = yield call(() => axios.get(`${API_BASE_URL}/api/products`));
    yield put({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching products:', error);
    yield put({ type: 'FETCH_PRODUCTS_FAILURE', error });
  }
}


function* fetchProductByIdSaga(action) {
  try {
    const response = yield call(() =>
      axios.get(`${API_BASE_URL}/api/products/${action.payload}`)
    );
    yield put({ type: 'FETCH_PRODUCT_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    yield put({ type: 'FETCH_PRODUCT_FAILURE', error });
  }
}


function* addToCartSaga(action) {
  try {
    yield call(() => axios.post(`${API_BASE_URL}/api/cart`, action.payload));
    yield put({ type: 'ADD_TO_CART_SUCCESS', payload: action.payload });
  } catch (error) {
    console.error('Error adding to cart:', error);
    yield put({ type: 'ADD_TO_CART_FAILURE', error });
  }
}

function* updateCartQuantitySaga(action) {
  try {
    const { cartItemId, quantity } = action.payload;
    yield call(() =>
      axios.put(`${API_BASE_URL}/api/cart/update-quantity/${cartItemId}`, null, {
        params: { newQuantity: quantity },
      })
    );
    yield put({ type: 'UPDATE_CART_ITEM_SUCCESS', payload: action.payload });
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    yield put({ type: 'UPDATE_CART_ITEM_FAILURE', error });
  }
}


function* deleteCartItemSaga(action) {
  try {
    yield call(() => axios.delete(`${API_BASE_URL}/api/cart/${action.payload}`));
    yield put({ type: 'DELETE_CART_ITEM_SUCCESS', payload: action.payload });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    yield put({ type: 'DELETE_CART_ITEM_FAILURE', error });
  }
}


function* fetchCartItemsSaga() {
  try {
    const response = yield call(() => axios.get(`${API_BASE_URL}/api/cart`));
    const cartItems = response.data;

    const detailedCartItems = yield Promise.all(
      cartItems.map(async (item) => {
        const productResponse = await axios.get(`${API_BASE_URL}/api/products/${item.productId}`);
        return {
          ...item,
          productImage: productResponse.data.productImage,
          productName: productResponse.data.name,
          productDescription: productResponse.data.description
        };
      })
    );

    yield put({ type: 'FETCH_CART_ITEMS_SUCCESS', payload: detailedCartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    yield put({ type: 'FETCH_CART_ITEMS_FAILURE', error });
  }
}


function* placeOrderSaga(action) {
  try {
    const response = yield call(() =>
      axios.post(`${API_BASE_URL}/api/orders`, action.payload)
    );
    yield put({ type: 'PLACE_ORDER_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error placing order:', error);
    yield put({ type: 'PLACE_ORDER_FAILURE', error });
  }
}

export default function* rootSaga() {
  yield takeEvery('FETCH_PRODUCTS', fetchProductsSaga);
  yield takeEvery('FETCH_PRODUCT', fetchProductByIdSaga);
  yield takeEvery('ADD_TO_CART', addToCartSaga);
  yield takeEvery('UPDATE_CART_ITEM', updateCartQuantitySaga);
  yield takeEvery('DELETE_CART_ITEM', deleteCartItemSaga);
  yield takeEvery('FETCH_CART_ITEMS', fetchCartItemsSaga);
  yield takeEvery('PLACE_ORDER', placeOrderSaga);
}
