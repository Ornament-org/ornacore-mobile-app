import { b2cApi } from '../../../../services/api';

// Action Types
export const B2C_CART_LOADING = 'B2C_CART_LOADING';
export const B2C_CART_SUCCESS = 'B2C_CART_SUCCESS';
export const B2C_CART_ERROR = 'B2C_CART_ERROR';

export const B2C_ADD_TO_CART_LOADING = 'B2C_ADD_TO_CART_LOADING';
export const B2C_ADD_TO_CART_SUCCESS = 'B2C_ADD_TO_CART_SUCCESS';
export const B2C_ADD_TO_CART_ERROR = 'B2C_ADD_TO_CART_ERROR';

export const B2C_UPDATE_CART_LOADING = 'B2C_UPDATE_CART_LOADING';
export const B2C_UPDATE_CART_SUCCESS = 'B2C_UPDATE_CART_SUCCESS';
export const B2C_UPDATE_CART_ERROR = 'B2C_UPDATE_CART_ERROR';

export const B2C_REMOVE_CART_LOADING = 'B2C_REMOVE_CART_LOADING';
export const B2C_REMOVE_CART_SUCCESS = 'B2C_REMOVE_CART_SUCCESS';
export const B2C_REMOVE_CART_ERROR = 'B2C_REMOVE_CART_ERROR';

export const B2C_CLEAR_CART_SUCCESS = 'B2C_CLEAR_CART_SUCCESS';

export const B2C_COUPON_LOADING = 'B2C_COUPON_LOADING';
export const B2C_COUPON_SUCCESS = 'B2C_COUPON_SUCCESS';
export const B2C_COUPON_ERROR = 'B2C_COUPON_ERROR';

// Cart Actions
export const fetchB2CCart = () => async (dispatch) => {
  dispatch({ type: B2C_CART_LOADING });
  try {
    const response = await b2cApi.cart.getCart();
    dispatch({
      type: B2C_CART_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_CART_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const addToB2CCart = (data) => async (dispatch) => {
  dispatch({ type: B2C_ADD_TO_CART_LOADING });
  try {
    const response = await b2cApi.cart.addToCart(data);
    dispatch({
      type: B2C_ADD_TO_CART_SUCCESS,
      payload: response.data.data,
    });
    // Refresh cart after adding
    dispatch(fetchB2CCart());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_ADD_TO_CART_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const updateB2CCartItem = (itemId, data) => async (dispatch) => {
  dispatch({ type: B2C_UPDATE_CART_LOADING });
  try {
    const response = await b2cApi.cart.updateCartItem(itemId, data);
    dispatch({
      type: B2C_UPDATE_CART_SUCCESS,
      payload: response.data.data,
    });
    // Refresh cart after updating
    dispatch(fetchB2CCart());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_UPDATE_CART_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const removeFromB2CCart = (itemId) => async (dispatch) => {
  dispatch({ type: B2C_REMOVE_CART_LOADING });
  try {
    const response = await b2cApi.cart.removeCartItem(itemId);
    dispatch({
      type: B2C_REMOVE_CART_SUCCESS,
      payload: { itemId },
    });
    // Refresh cart after removing
    dispatch(fetchB2CCart());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_REMOVE_CART_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const clearB2CCart = () => async (dispatch) => {
  try {
    await b2cApi.cart.clearCart();
    dispatch({
      type: B2C_CLEAR_CART_SUCCESS,
    });
  } catch (error) {
    throw error;
  }
};

export const applyB2CCoupon = (code) => async (dispatch) => {
  dispatch({ type: B2C_COUPON_LOADING });
  try {
    const response = await b2cApi.cart.applyCoupon(code);
    dispatch({
      type: B2C_COUPON_SUCCESS,
      payload: response.data.data,
    });
    // Refresh cart after applying coupon
    dispatch(fetchB2CCart());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_COUPON_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const removeB2CCoupon = () => async (dispatch) => {
  try {
    const response = await b2cApi.cart.removeCoupon();
    // Refresh cart after removing coupon
    dispatch(fetchB2CCart());
    return response.data;
  } catch (error) {
    throw error;
  }
};
