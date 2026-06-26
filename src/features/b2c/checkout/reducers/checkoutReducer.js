import {
  B2C_SHIPPING_METHODS_LOADING,
  B2C_SHIPPING_METHODS_SUCCESS,
  B2C_SHIPPING_METHODS_ERROR,
  B2C_CALCULATE_SHIPPING_LOADING,
  B2C_CALCULATE_SHIPPING_SUCCESS,
  B2C_CALCULATE_SHIPPING_ERROR,
  B2C_PAYMENT_METHODS_LOADING,
  B2C_PAYMENT_METHODS_SUCCESS,
  B2C_PAYMENT_METHODS_ERROR,
  B2C_PROCESS_PAYMENT_LOADING,
  B2C_PROCESS_PAYMENT_SUCCESS,
  B2C_PROCESS_PAYMENT_ERROR,
  B2C_APPLY_DISCOUNT_LOADING,
  B2C_APPLY_DISCOUNT_SUCCESS,
  B2C_APPLY_DISCOUNT_ERROR,
  B2C_VALIDATE_CHECKOUT_LOADING,
  B2C_VALIDATE_CHECKOUT_SUCCESS,
  B2C_VALIDATE_CHECKOUT_ERROR,
} from '../actions/checkoutActions';

const initialState = {
  shippingMethods: [],
  shippingCalculation: null,
  paymentMethods: [],
  paymentResult: null,
  discountResult: null,
  validationResult: null,
  shippingMethodsLoading: false,
  calculateShippingLoading: false,
  paymentMethodsLoading: false,
  processPaymentLoading: false,
  applyDiscountLoading: false,
  validateCheckoutLoading: false,
  shippingMethodsError: null,
  calculateShippingError: null,
  paymentMethodsError: null,
  processPaymentError: null,
  applyDiscountError: null,
  validateCheckoutError: null,
};

const b2cCheckoutReducer = (state = initialState, action) => {
  switch (action.type) {
    // Shipping Methods
    case B2C_SHIPPING_METHODS_LOADING:
      return {
        ...state,
        shippingMethodsLoading: true,
        shippingMethodsError: null,
      };
    case B2C_SHIPPING_METHODS_SUCCESS:
      return {
        ...state,
        shippingMethodsLoading: false,
        shippingMethods: action.payload,
        shippingMethodsError: null,
      };
    case B2C_SHIPPING_METHODS_ERROR:
      return {
        ...state,
        shippingMethodsLoading: false,
        shippingMethodsError: action.payload,
      };

    // Calculate Shipping
    case B2C_CALCULATE_SHIPPING_LOADING:
      return {
        ...state,
        calculateShippingLoading: true,
        calculateShippingError: null,
      };
    case B2C_CALCULATE_SHIPPING_SUCCESS:
      return {
        ...state,
        calculateShippingLoading: false,
        shippingCalculation: action.payload,
        calculateShippingError: null,
      };
    case B2C_CALCULATE_SHIPPING_ERROR:
      return {
        ...state,
        calculateShippingLoading: false,
        calculateShippingError: action.payload,
      };

    // Payment Methods
    case B2C_PAYMENT_METHODS_LOADING:
      return {
        ...state,
        paymentMethodsLoading: true,
        paymentMethodsError: null,
      };
    case B2C_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        paymentMethodsLoading: false,
        paymentMethods: action.payload,
        paymentMethodsError: null,
      };
    case B2C_PAYMENT_METHODS_ERROR:
      return {
        ...state,
        paymentMethodsLoading: false,
        paymentMethodsError: action.payload,
      };

    // Process Payment
    case B2C_PROCESS_PAYMENT_LOADING:
      return {
        ...state,
        processPaymentLoading: true,
        processPaymentError: null,
      };
    case B2C_PROCESS_PAYMENT_SUCCESS:
      return {
        ...state,
        processPaymentLoading: false,
        paymentResult: action.payload,
        processPaymentError: null,
      };
    case B2C_PROCESS_PAYMENT_ERROR:
      return {
        ...state,
        processPaymentLoading: false,
        processPaymentError: action.payload,
      };

    // Apply Discount
    case B2C_APPLY_DISCOUNT_LOADING:
      return {
        ...state,
        applyDiscountLoading: true,
        applyDiscountError: null,
      };
    case B2C_APPLY_DISCOUNT_SUCCESS:
      return {
        ...state,
        applyDiscountLoading: false,
        discountResult: action.payload,
        applyDiscountError: null,
      };
    case B2C_APPLY_DISCOUNT_ERROR:
      return {
        ...state,
        applyDiscountLoading: false,
        applyDiscountError: action.payload,
      };

    // Validate Checkout
    case B2C_VALIDATE_CHECKOUT_LOADING:
      return {
        ...state,
        validateCheckoutLoading: true,
        validateCheckoutError: null,
      };
    case B2C_VALIDATE_CHECKOUT_SUCCESS:
      return {
        ...state,
        validateCheckoutLoading: false,
        validationResult: action.payload,
        validateCheckoutError: null,
      };
    case B2C_VALIDATE_CHECKOUT_ERROR:
      return {
        ...state,
        validateCheckoutLoading: false,
        validateCheckoutError: action.payload,
      };

    default:
      return state;
  }
};

export default b2cCheckoutReducer;
