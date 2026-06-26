import {
  B2C_ORDERS_LOADING,
  B2C_ORDERS_SUCCESS,
  B2C_ORDERS_ERROR,
  B2C_ORDER_DETAILS_LOADING,
  B2C_ORDER_DETAILS_SUCCESS,
  B2C_ORDER_DETAILS_ERROR,
  B2C_CREATE_ORDER_LOADING,
  B2C_CREATE_ORDER_SUCCESS,
  B2C_CREATE_ORDER_ERROR,
  B2C_CANCEL_ORDER_LOADING,
  B2C_CANCEL_ORDER_SUCCESS,
  B2C_CANCEL_ORDER_ERROR,
  B2C_RETURN_ORDER_LOADING,
  B2C_RETURN_ORDER_SUCCESS,
  B2C_RETURN_ORDER_ERROR,
  B2C_ORDER_TRACKING_LOADING,
  B2C_ORDER_TRACKING_SUCCESS,
  B2C_ORDER_TRACKING_ERROR,
} from '../actions/orderActions';

const initialState = {
  orders: [],
  orderDetails: null,
  orderTracking: null,
  loading: false,
  orderDetailsLoading: false,
  createOrderLoading: false,
  cancelOrderLoading: false,
  returnOrderLoading: false,
  trackingLoading: false,
  error: null,
  orderDetailsError: null,
  createOrderError: null,
  cancelOrderError: null,
  returnOrderError: null,
  trackingError: null,
};

const b2cOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    // Orders List
    case B2C_ORDERS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case B2C_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };
    case B2C_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Order Details
    case B2C_ORDER_DETAILS_LOADING:
      return {
        ...state,
        orderDetailsLoading: true,
        orderDetailsError: null,
      };
    case B2C_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetailsLoading: false,
        orderDetails: action.payload,
        orderDetailsError: null,
      };
    case B2C_ORDER_DETAILS_ERROR:
      return {
        ...state,
        orderDetailsLoading: false,
        orderDetailsError: action.payload,
      };

    // Create Order
    case B2C_CREATE_ORDER_LOADING:
      return {
        ...state,
        createOrderLoading: true,
        createOrderError: null,
      };
    case B2C_CREATE_ORDER_SUCCESS:
      return {
        ...state,
        createOrderLoading: false,
        createOrderError: null,
      };
    case B2C_CREATE_ORDER_ERROR:
      return {
        ...state,
        createOrderLoading: false,
        createOrderError: action.payload,
      };

    // Cancel Order
    case B2C_CANCEL_ORDER_LOADING:
      return {
        ...state,
        cancelOrderLoading: true,
        cancelOrderError: null,
      };
    case B2C_CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        cancelOrderLoading: false,
        cancelOrderError: null,
      };
    case B2C_CANCEL_ORDER_ERROR:
      return {
        ...state,
        cancelOrderLoading: false,
        cancelOrderError: action.payload,
      };

    // Return Order
    case B2C_RETURN_ORDER_LOADING:
      return {
        ...state,
        returnOrderLoading: true,
        returnOrderError: null,
      };
    case B2C_RETURN_ORDER_SUCCESS:
      return {
        ...state,
        returnOrderLoading: false,
        returnOrderError: null,
      };
    case B2C_RETURN_ORDER_ERROR:
      return {
        ...state,
        returnOrderLoading: false,
        returnOrderError: action.payload,
      };

    // Order Tracking
    case B2C_ORDER_TRACKING_LOADING:
      return {
        ...state,
        trackingLoading: true,
        trackingError: null,
      };
    case B2C_ORDER_TRACKING_SUCCESS:
      return {
        ...state,
        trackingLoading: false,
        orderTracking: action.payload,
        trackingError: null,
      };
    case B2C_ORDER_TRACKING_ERROR:
      return {
        ...state,
        trackingLoading: false,
        trackingError: action.payload,
      };

    default:
      return state;
  }
};

export default b2cOrderReducer;
