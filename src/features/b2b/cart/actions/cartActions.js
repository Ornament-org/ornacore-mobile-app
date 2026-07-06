import { b2bApi } from '../../../../services/api';

// Action Types
export const B2B_CART_LOADING = 'B2B_CART_LOADING';
export const B2B_CART_SUCCESS = 'B2B_CART_SUCCESS';
export const B2B_CART_ERROR = 'B2B_CART_ERROR';

export const B2B_ADD_TO_CART_LOADING = 'B2B_ADD_TO_CART_LOADING';
export const B2B_ADD_TO_CART_SUCCESS = 'B2B_ADD_TO_CART_SUCCESS';
export const B2B_ADD_TO_CART_ERROR = 'B2B_ADD_TO_CART_ERROR';

export const B2B_UPDATE_CART_LOADING = 'B2B_UPDATE_CART_LOADING';
export const B2B_UPDATE_CART_SUCCESS = 'B2B_UPDATE_CART_SUCCESS';
export const B2B_UPDATE_CART_ERROR = 'B2B_UPDATE_CART_ERROR';

export const B2B_REMOVE_CART_LOADING = 'B2B_REMOVE_CART_LOADING';
export const B2B_REMOVE_CART_SUCCESS = 'B2B_REMOVE_CART_SUCCESS';
export const B2B_REMOVE_CART_ERROR = 'B2B_REMOVE_CART_ERROR';

// Cart Actions
export const fetchB2BCart = () => async (dispatch) => {
  dispatch({ type: B2B_CART_LOADING });
  try {
    const response = await b2bApi.cart.getCart();
    dispatch({
      type: B2B_CART_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_CART_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const addToB2BCart = (data) => async (dispatch) => {
  dispatch({ type: B2B_ADD_TO_CART_LOADING });
  try {
    const response = await b2bApi.cart.addToCart(data);
    dispatch({
      type: B2B_ADD_TO_CART_SUCCESS,
      payload: response.data.data,
    });
    // Refresh cart after adding
    dispatch(fetchB2BCart());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_ADD_TO_CART_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const updateB2BCartItem = (itemId, data) => async (dispatch) => {
  dispatch({ type: B2B_UPDATE_CART_LOADING });
  try {
    const response = await b2bApi.cart.updateCartItem(itemId, data);
    dispatch({
      type: B2B_UPDATE_CART_SUCCESS,
      payload: response.data.data,
    });
    // Refresh cart after updating
    dispatch(fetchB2BCart());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_UPDATE_CART_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const removeFromB2BCart = (itemId) => async (dispatch) => {
  dispatch({ type: B2B_REMOVE_CART_LOADING });
  try {
    const response = await b2bApi.cart.removeCartItem(itemId);
    dispatch({
      type: B2B_REMOVE_CART_SUCCESS,
      payload: { itemId },
    });
    // Refresh cart after removing
    dispatch(fetchB2BCart());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_REMOVE_CART_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

