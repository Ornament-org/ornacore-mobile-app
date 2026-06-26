import { b2bApi } from '../../../../services/api';

// Action Types
export const B2B_PAYMENT_METHODS_LOADING = 'B2B_PAYMENT_METHODS_LOADING';
export const B2B_PAYMENT_METHODS_SUCCESS = 'B2B_PAYMENT_METHODS_SUCCESS';
export const B2B_PAYMENT_METHODS_ERROR = 'B2B_PAYMENT_METHODS_ERROR';

export const B2B_CREATE_PAYMENT_LOADING = 'B2B_CREATE_PAYMENT_LOADING';
export const B2B_CREATE_PAYMENT_SUCCESS = 'B2B_CREATE_PAYMENT_SUCCESS';
export const B2B_CREATE_PAYMENT_ERROR = 'B2B_CREATE_PAYMENT_ERROR';

export const B2B_PAYMENT_DETAILS_LOADING = 'B2B_PAYMENT_DETAILS_LOADING';
export const B2B_PAYMENT_DETAILS_SUCCESS = 'B2B_PAYMENT_DETAILS_SUCCESS';
export const B2B_PAYMENT_DETAILS_ERROR = 'B2B_PAYMENT_DETAILS_ERROR';

export const B2B_PAYMENT_LEDGER_LOADING = 'B2B_PAYMENT_LEDGER_LOADING';
export const B2B_PAYMENT_LEDGER_SUCCESS = 'B2B_PAYMENT_LEDGER_SUCCESS';
export const B2B_PAYMENT_LEDGER_ERROR = 'B2B_PAYMENT_LEDGER_ERROR';

// Payment Actions
export const fetchB2BPaymentMethods = () => async (dispatch) => {
  dispatch({ type: B2B_PAYMENT_METHODS_LOADING });
  try {
    const response = await b2bApi.payment.getPaymentMethods();
    dispatch({
      type: B2B_PAYMENT_METHODS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_PAYMENT_METHODS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const createB2BPayment = (data) => async (dispatch) => {
  dispatch({ type: B2B_CREATE_PAYMENT_LOADING });
  try {
    const response = await b2bApi.payment.createPayment(data);
    dispatch({
      type: B2B_CREATE_PAYMENT_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_CREATE_PAYMENT_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2BPaymentDetails = (paymentId) => async (dispatch) => {
  dispatch({ type: B2B_PAYMENT_DETAILS_LOADING });
  try {
    const response = await b2bApi.payment.getPaymentDetails(paymentId);
    dispatch({
      type: B2B_PAYMENT_DETAILS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_PAYMENT_DETAILS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2BPaymentLedger = (params = {}) => async (dispatch) => {
  dispatch({ type: B2B_PAYMENT_LEDGER_LOADING });
  try {
    const response = await b2bApi.payment.getPaymentLedger(params);
    dispatch({
      type: B2B_PAYMENT_LEDGER_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_PAYMENT_LEDGER_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2BInvoice = (invoiceId) => async (dispatch) => {
  try {
    const response = await b2bApi.payment.getInvoice(invoiceId);
    return response.data;
  } catch (error) {
    throw error;
  }
};
