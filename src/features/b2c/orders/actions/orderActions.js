import { b2cApi } from '../../../../services/api';

// Action Types
export const B2C_ORDERS_LOADING = 'B2C_ORDERS_LOADING';
export const B2C_ORDERS_SUCCESS = 'B2C_ORDERS_SUCCESS';
export const B2C_ORDERS_ERROR = 'B2C_ORDERS_ERROR';

export const B2C_ORDER_DETAILS_LOADING = 'B2C_ORDER_DETAILS_LOADING';
export const B2C_ORDER_DETAILS_SUCCESS = 'B2C_ORDER_DETAILS_SUCCESS';
export const B2C_ORDER_DETAILS_ERROR = 'B2C_ORDER_DETAILS_ERROR';

export const B2C_CREATE_ORDER_LOADING = 'B2C_CREATE_ORDER_LOADING';
export const B2C_CREATE_ORDER_SUCCESS = 'B2C_CREATE_ORDER_SUCCESS';
export const B2C_CREATE_ORDER_ERROR = 'B2C_CREATE_ORDER_ERROR';

export const B2C_CANCEL_ORDER_LOADING = 'B2C_CANCEL_ORDER_LOADING';
export const B2C_CANCEL_ORDER_SUCCESS = 'B2C_CANCEL_ORDER_SUCCESS';
export const B2C_CANCEL_ORDER_ERROR = 'B2C_CANCEL_ORDER_ERROR';

export const B2C_RETURN_ORDER_LOADING = 'B2C_RETURN_ORDER_LOADING';
export const B2C_RETURN_ORDER_SUCCESS = 'B2C_RETURN_ORDER_SUCCESS';
export const B2C_RETURN_ORDER_ERROR = 'B2C_RETURN_ORDER_ERROR';

export const B2C_ORDER_TRACKING_LOADING = 'B2C_ORDER_TRACKING_LOADING';
export const B2C_ORDER_TRACKING_SUCCESS = 'B2C_ORDER_TRACKING_SUCCESS';
export const B2C_ORDER_TRACKING_ERROR = 'B2C_ORDER_TRACKING_ERROR';

// Order Actions
export const fetchB2COrders = (params = {}) => async (dispatch) => {
  dispatch({ type: B2C_ORDERS_LOADING });
  try {
    const response = await b2cApi.order.getOrders(params);
    dispatch({
      type: B2C_ORDERS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_ORDERS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2COrderDetails = (orderId) => async (dispatch) => {
  dispatch({ type: B2C_ORDER_DETAILS_LOADING });
  try {
    const response = await b2cApi.order.getOrderDetails(orderId);
    dispatch({
      type: B2C_ORDER_DETAILS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_ORDER_DETAILS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const createB2COrder = (data) => async (dispatch) => {
  dispatch({ type: B2C_CREATE_ORDER_LOADING });
  try {
    const response = await b2cApi.order.createOrder(data);
    dispatch({
      type: B2C_CREATE_ORDER_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_CREATE_ORDER_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const cancelB2COrder = (orderId) => async (dispatch) => {
  dispatch({ type: B2C_CANCEL_ORDER_LOADING });
  try {
    const response = await b2cApi.order.cancelOrder(orderId);
    dispatch({
      type: B2C_CANCEL_ORDER_SUCCESS,
      payload: { orderId },
    });
    // Refresh orders list
    dispatch(fetchB2COrders());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_CANCEL_ORDER_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const returnB2COrder = (orderId, data) => async (dispatch) => {
  dispatch({ type: B2C_RETURN_ORDER_LOADING });
  try {
    const response = await b2cApi.order.returnOrder(orderId, data);
    dispatch({
      type: B2C_RETURN_ORDER_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_RETURN_ORDER_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const trackB2COrder = (orderId) => async (dispatch) => {
  dispatch({ type: B2C_ORDER_TRACKING_LOADING });
  try {
    const response = await b2cApi.order.trackOrder(orderId);
    dispatch({
      type: B2C_ORDER_TRACKING_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_ORDER_TRACKING_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2COrderHistory = (params = {}) => async (dispatch) => {
  try {
    const response = await b2cApi.order.getOrderHistory(params);
    return response.data;
  } catch (error) {
    throw error;
  }
};
