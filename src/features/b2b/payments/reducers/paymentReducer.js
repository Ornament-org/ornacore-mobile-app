import {
  B2B_PAYMENT_METHODS_LOADING,
  B2B_PAYMENT_METHODS_SUCCESS,
  B2B_PAYMENT_METHODS_ERROR,
  B2B_CREATE_PAYMENT_LOADING,
  B2B_CREATE_PAYMENT_SUCCESS,
  B2B_CREATE_PAYMENT_ERROR,
  B2B_PAYMENT_DETAILS_LOADING,
  B2B_PAYMENT_DETAILS_SUCCESS,
  B2B_PAYMENT_DETAILS_ERROR,
  B2B_PAYMENT_LEDGER_LOADING,
  B2B_PAYMENT_LEDGER_SUCCESS,
  B2B_PAYMENT_LEDGER_ERROR,
} from '../actions/paymentActions';

const initialState = {
  paymentMethods: [],
  paymentDetails: null,
  paymentLedger: [],
  paymentMethodsLoading: false,
  createPaymentLoading: false,
  paymentDetailsLoading: false,
  paymentLedgerLoading: false,
  paymentMethodsError: null,
  createPaymentError: null,
  paymentDetailsError: null,
  paymentLedgerError: null,
};

const b2bPaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    // Payment Methods
    case B2B_PAYMENT_METHODS_LOADING:
      return {
        ...state,
        paymentMethodsLoading: true,
        paymentMethodsError: null,
      };
    case B2B_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        paymentMethodsLoading: false,
        paymentMethods: action.payload,
        paymentMethodsError: null,
      };
    case B2B_PAYMENT_METHODS_ERROR:
      return {
        ...state,
        paymentMethodsLoading: false,
        paymentMethodsError: action.payload,
      };

    // Create Payment
    case B2B_CREATE_PAYMENT_LOADING:
      return {
        ...state,
        createPaymentLoading: true,
        createPaymentError: null,
      };
    case B2B_CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        createPaymentLoading: false,
        createPaymentError: null,
      };
    case B2B_CREATE_PAYMENT_ERROR:
      return {
        ...state,
        createPaymentLoading: false,
        createPaymentError: action.payload,
      };

    // Payment Details
    case B2B_PAYMENT_DETAILS_LOADING:
      return {
        ...state,
        paymentDetailsLoading: true,
        paymentDetailsError: null,
      };
    case B2B_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        paymentDetailsLoading: false,
        paymentDetails: action.payload,
        paymentDetailsError: null,
      };
    case B2B_PAYMENT_DETAILS_ERROR:
      return {
        ...state,
        paymentDetailsLoading: false,
        paymentDetailsError: action.payload,
      };

    // Payment Ledger
    case B2B_PAYMENT_LEDGER_LOADING:
      return {
        ...state,
        paymentLedgerLoading: true,
        paymentLedgerError: null,
      };
    case B2B_PAYMENT_LEDGER_SUCCESS:
      return {
        ...state,
        paymentLedgerLoading: false,
        paymentLedger: action.payload,
        paymentLedgerError: null,
      };
    case B2B_PAYMENT_LEDGER_ERROR:
      return {
        ...state,
        paymentLedgerLoading: false,
        paymentLedgerError: action.payload,
      };

    default:
      return state;
  }
};

export default b2bPaymentReducer;
