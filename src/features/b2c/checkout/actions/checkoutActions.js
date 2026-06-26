import { b2cApi } from '../../../../services/api';

// Action Types
export const B2C_SHIPPING_METHODS_LOADING = 'B2C_SHIPPING_METHODS_LOADING';
export const B2C_SHIPPING_METHODS_SUCCESS = 'B2C_SHIPPING_METHODS_SUCCESS';
export const B2C_SHIPPING_METHODS_ERROR = 'B2C_SHIPPING_METHODS_ERROR';

export const B2C_CALCULATE_SHIPPING_LOADING = 'B2C_CALCULATE_SHIPPING_LOADING';
export const B2C_CALCULATE_SHIPPING_SUCCESS = 'B2C_CALCULATE_SHIPPING_SUCCESS';
export const B2C_CALCULATE_SHIPPING_ERROR = 'B2C_CALCULATE_SHIPPING_ERROR';

export const B2C_PAYMENT_METHODS_LOADING = 'B2C_PAYMENT_METHODS_LOADING';
export const B2C_PAYMENT_METHODS_SUCCESS = 'B2C_PAYMENT_METHODS_SUCCESS';
export const B2C_PAYMENT_METHODS_ERROR = 'B2C_PAYMENT_METHODS_ERROR';

export const B2C_PROCESS_PAYMENT_LOADING = 'B2C_PROCESS_PAYMENT_LOADING';
export const B2C_PROCESS_PAYMENT_SUCCESS = 'B2C_PROCESS_PAYMENT_SUCCESS';
export const B2C_PROCESS_PAYMENT_ERROR = 'B2C_PROCESS_PAYMENT_ERROR';

export const B2C_APPLY_DISCOUNT_LOADING = 'B2C_APPLY_DISCOUNT_LOADING';
export const B2C_APPLY_DISCOUNT_SUCCESS = 'B2C_APPLY_DISCOUNT_SUCCESS';
export const B2C_APPLY_DISCOUNT_ERROR = 'B2C_APPLY_DISCOUNT_ERROR';

export const B2C_VALIDATE_CHECKOUT_LOADING = 'B2C_VALIDATE_CHECKOUT_LOADING';
export const B2C_VALIDATE_CHECKOUT_SUCCESS = 'B2C_VALIDATE_CHECKOUT_SUCCESS';
export const B2C_VALIDATE_CHECKOUT_ERROR = 'B2C_VALIDATE_CHECKOUT_ERROR';

// Checkout Actions
export const fetchB2CShippingMethods = (params = {}) => async (dispatch) => {
  dispatch({ type: B2C_SHIPPING_METHODS_LOADING });
  try {
    const response = await b2cApi.checkout.getShippingMethods(params);
    dispatch({
      type: B2C_SHIPPING_METHODS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_SHIPPING_METHODS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const calculateB2CShipping = (data) => async (dispatch) => {
  dispatch({ type: B2C_CALCULATE_SHIPPING_LOADING });
  try {
    const response = await b2cApi.checkout.calculateShipping(data);
    dispatch({
      type: B2C_CALCULATE_SHIPPING_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_CALCULATE_SHIPPING_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2CPaymentMethods = () => async (dispatch) => {
  dispatch({ type: B2C_PAYMENT_METHODS_LOADING });
  try {
    const response = await b2cApi.checkout.getPaymentMethods();
    dispatch({
      type: B2C_PAYMENT_METHODS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_PAYMENT_METHODS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const processB2CPayment = (data) => async (dispatch) => {
  dispatch({ type: B2C_PROCESS_PAYMENT_LOADING });
  try {
    const response = await b2cApi.checkout.processPayment(data);
    dispatch({
      type: B2C_PROCESS_PAYMENT_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_PROCESS_PAYMENT_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const applyB2CDiscountCode = (code) => async (dispatch) => {
  dispatch({ type: B2C_APPLY_DISCOUNT_LOADING });
  try {
    const response = await b2cApi.checkout.applyDiscountCode(code);
    dispatch({
      type: B2C_APPLY_DISCOUNT_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_APPLY_DISCOUNT_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const validateB2CCheckout = (data) => async (dispatch) => {
  dispatch({ type: B2C_VALIDATE_CHECKOUT_LOADING });
  try {
    const response = await b2cApi.checkout.validateCheckout(data);
    dispatch({
      type: B2C_VALIDATE_CHECKOUT_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_VALIDATE_CHECKOUT_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};
