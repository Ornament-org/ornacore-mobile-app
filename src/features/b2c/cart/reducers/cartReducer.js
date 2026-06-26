import {
  B2C_CART_LOADING,
  B2C_CART_SUCCESS,
  B2C_CART_ERROR,
  B2C_ADD_TO_CART_LOADING,
  B2C_ADD_TO_CART_SUCCESS,
  B2C_ADD_TO_CART_ERROR,
  B2C_UPDATE_CART_LOADING,
  B2C_UPDATE_CART_SUCCESS,
  B2C_UPDATE_CART_ERROR,
  B2C_REMOVE_CART_LOADING,
  B2C_REMOVE_CART_SUCCESS,
  B2C_REMOVE_CART_ERROR,
  B2C_CLEAR_CART_SUCCESS,
  B2C_COUPON_LOADING,
  B2C_COUPON_SUCCESS,
  B2C_COUPON_ERROR,
} from '../actions/cartActions';

const initialState = {
  cart: null,
  loading: false,
  addToCartLoading: false,
  updateCartLoading: false,
  removeCartLoading: false,
  couponLoading: false,
  error: null,
  addToCartError: null,
  updateCartError: null,
  removeCartError: null,
  couponError: null,
};

const b2cCartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Cart
    case B2C_CART_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case B2C_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        error: null,
      };
    case B2C_CART_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Add to Cart
    case B2C_ADD_TO_CART_LOADING:
      return {
        ...state,
        addToCartLoading: true,
        addToCartError: null,
      };
    case B2C_ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addToCartLoading: false,
        addToCartError: null,
      };
    case B2C_ADD_TO_CART_ERROR:
      return {
        ...state,
        addToCartLoading: false,
        addToCartError: action.payload,
      };

    // Update Cart
    case B2C_UPDATE_CART_LOADING:
      return {
        ...state,
        updateCartLoading: true,
        updateCartError: null,
      };
    case B2C_UPDATE_CART_SUCCESS:
      return {
        ...state,
        updateCartLoading: false,
        updateCartError: null,
      };
    case B2C_UPDATE_CART_ERROR:
      return {
        ...state,
        updateCartLoading: false,
        updateCartError: action.payload,
      };

    // Remove from Cart
    case B2C_REMOVE_CART_LOADING:
      return {
        ...state,
        removeCartLoading: true,
        removeCartError: null,
      };
    case B2C_REMOVE_CART_SUCCESS:
      return {
        ...state,
        removeCartLoading: false,
        removeCartError: null,
      };
    case B2C_REMOVE_CART_ERROR:
      return {
        ...state,
        removeCartLoading: false,
        removeCartError: action.payload,
      };

    // Clear Cart
    case B2C_CLEAR_CART_SUCCESS:
      return {
        ...state,
        cart: null,
      };

    // Apply Coupon
    case B2C_COUPON_LOADING:
      return {
        ...state,
        couponLoading: true,
        couponError: null,
      };
    case B2C_COUPON_SUCCESS:
      return {
        ...state,
        couponLoading: false,
        couponError: null,
      };
    case B2C_COUPON_ERROR:
      return {
        ...state,
        couponLoading: false,
        couponError: action.payload,
      };

    default:
      return state;
  }
};

export default b2cCartReducer;
