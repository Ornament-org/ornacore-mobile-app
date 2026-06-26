import { b2cApi } from '../../../../services/api';

// Action Types
export const B2C_WISHLIST_LOADING = 'B2C_WISHLIST_LOADING';
export const B2C_WISHLIST_SUCCESS = 'B2C_WISHLIST_SUCCESS';
export const B2C_WISHLIST_ERROR = 'B2C_WISHLIST_ERROR';

export const B2C_ADD_TO_WISHLIST_LOADING = 'B2C_ADD_TO_WISHLIST_LOADING';
export const B2C_ADD_TO_WISHLIST_SUCCESS = 'B2C_ADD_TO_WISHLIST_SUCCESS';
export const B2C_ADD_TO_WISHLIST_ERROR = 'B2C_ADD_TO_WISHLIST_ERROR';

export const B2C_REMOVE_FROM_WISHLIST_LOADING = 'B2C_REMOVE_FROM_WISHLIST_LOADING';
export const B2C_REMOVE_FROM_WISHLIST_SUCCESS = 'B2C_REMOVE_FROM_WISHLIST_SUCCESS';
export const B2C_REMOVE_FROM_WISHLIST_ERROR = 'B2C_REMOVE_FROM_WISHLIST_ERROR';

export const B2C_CLEAR_WISHLIST_SUCCESS = 'B2C_CLEAR_WISHLIST_SUCCESS';

// Wishlist Actions
export const fetchB2CWishlist = () => async (dispatch) => {
  dispatch({ type: B2C_WISHLIST_LOADING });
  try {
    const response = await b2cApi.wishlist.getWishlist();
    dispatch({
      type: B2C_WISHLIST_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_WISHLIST_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const addToB2CWishlist = (productId) => async (dispatch) => {
  dispatch({ type: B2C_ADD_TO_WISHLIST_LOADING });
  try {
    const response = await b2cApi.wishlist.addToWishlist(productId);
    dispatch({
      type: B2C_ADD_TO_WISHLIST_SUCCESS,
      payload: response.data.data,
    });
    // Refresh wishlist after adding
    dispatch(fetchB2CWishlist());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_ADD_TO_WISHLIST_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const removeFromB2CWishlist = (itemId) => async (dispatch) => {
  dispatch({ type: B2C_REMOVE_FROM_WISHLIST_LOADING });
  try {
    const response = await b2cApi.wishlist.removeFromWishlist(itemId);
    dispatch({
      type: B2C_REMOVE_FROM_WISHLIST_SUCCESS,
      payload: { itemId },
    });
    // Refresh wishlist after removing
    dispatch(fetchB2CWishlist());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_REMOVE_FROM_WISHLIST_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const clearB2CWishlist = () => async (dispatch) => {
  try {
    await b2cApi.wishlist.clearWishlist();
    dispatch({
      type: B2C_CLEAR_WISHLIST_SUCCESS,
    });
  } catch (error) {
    throw error;
  }
};

export const moveB2CToCart = (itemId) => async (dispatch) => {
  try {
    const response = await b2cApi.wishlist.moveToCart(itemId);
    // Refresh wishlist after moving
    dispatch(fetchB2CWishlist());
    return response.data;
  } catch (error) {
    throw error;
  }
};
