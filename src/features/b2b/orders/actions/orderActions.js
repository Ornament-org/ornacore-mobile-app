import { b2bApi } from '../../../../services/api';

// Action Types
export const B2B_ORDERS_LOADING = 'B2B_ORDERS_LOADING';
export const B2B_ORDERS_SUCCESS = 'B2B_ORDERS_SUCCESS';
export const B2B_ORDERS_ERROR = 'B2B_ORDERS_ERROR';

export const B2B_ORDER_DETAILS_LOADING = 'B2B_ORDER_DETAILS_LOADING';
export const B2B_ORDER_DETAILS_SUCCESS = 'B2B_ORDER_DETAILS_SUCCESS';
export const B2B_ORDER_DETAILS_ERROR = 'B2B_ORDER_DETAILS_ERROR';

export const B2B_CREATE_ORDER_LOADING = 'B2B_CREATE_ORDER_LOADING';
export const B2B_CREATE_ORDER_SUCCESS = 'B2B_CREATE_ORDER_SUCCESS';
export const B2B_CREATE_ORDER_ERROR = 'B2B_CREATE_ORDER_ERROR';

export const B2B_CANCEL_ORDER_LOADING = 'B2B_CANCEL_ORDER_LOADING';
export const B2B_CANCEL_ORDER_SUCCESS = 'B2B_CANCEL_ORDER_SUCCESS';
export const B2B_CANCEL_ORDER_ERROR = 'B2B_CANCEL_ORDER_ERROR';

export const B2B_ORDER_TRACKING_LOADING = 'B2B_ORDER_TRACKING_LOADING';
export const B2B_ORDER_TRACKING_SUCCESS = 'B2B_ORDER_TRACKING_SUCCESS';
export const B2B_ORDER_TRACKING_ERROR = 'B2B_ORDER_TRACKING_ERROR';

// Order Actions
export const fetchB2BOrders = (params = {}) => async (dispatch) => {
  dispatch({ type: B2B_ORDERS_LOADING });
  try {
    const response = await b2bApi.order.getOrders(params);
    dispatch({
      type: B2B_ORDERS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_ORDERS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2BOrderDetails = (orderId) => async (dispatch) => {
  dispatch({ type: B2B_ORDER_DETAILS_LOADING });
  try {
    const response = await b2bApi.order.getOrderDetails(orderId);
    dispatch({
      type: B2B_ORDER_DETAILS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_ORDER_DETAILS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const createB2BOrder = (data) => async (dispatch) => {
  dispatch({ type: B2B_CREATE_ORDER_LOADING });
  try {
    const response = await b2bApi.order.createOrder(data);
    dispatch({
      type: B2B_CREATE_ORDER_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_CREATE_ORDER_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const cancelB2BOrder = (orderId) => async (dispatch) => {
  dispatch({ type: B2B_CANCEL_ORDER_LOADING });
  try {
    const response = await b2bApi.order.cancelOrder(orderId);
    dispatch({
      type: B2B_CANCEL_ORDER_SUCCESS,
      payload: { orderId },
    });
    // Refresh orders list
    dispatch(fetchB2BOrders());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_CANCEL_ORDER_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const trackB2BOrder = (orderId) => async (dispatch) => {
  dispatch({ type: B2B_ORDER_TRACKING_LOADING });
  try {
    const response = await b2bApi.order.trackOrder(orderId);
    dispatch({
      type: B2B_ORDER_TRACKING_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_ORDER_TRACKING_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2BOrderHistory = (params = {}) => async (dispatch) => {
  try {
    const response = await b2bApi.order.getOrderHistory(params);
    return response.data;
  } catch (error) {
    throw error;
  }
};
