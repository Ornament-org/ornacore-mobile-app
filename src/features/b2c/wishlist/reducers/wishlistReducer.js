import {
  B2C_WISHLIST_LOADING,
  B2C_WISHLIST_SUCCESS,
  B2C_WISHLIST_ERROR,
  B2C_ADD_TO_WISHLIST_LOADING,
  B2C_ADD_TO_WISHLIST_SUCCESS,
  B2C_ADD_TO_WISHLIST_ERROR,
  B2C_REMOVE_FROM_WISHLIST_LOADING,
  B2C_REMOVE_FROM_WISHLIST_SUCCESS,
  B2C_REMOVE_FROM_WISHLIST_ERROR,
  B2C_CLEAR_WISHLIST_SUCCESS,
} from '../actions/wishlistActions';

const initialState = {
  wishlist: [],
  loading: false,
  addToWishlistLoading: false,
  removeFromWishlistLoading: false,
  error: null,
  addToWishlistError: null,
  removeFromWishlistError: null,
};

const b2cWishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Wishlist
    case B2C_WISHLIST_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case B2C_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: action.payload,
        error: null,
      };
    case B2C_WISHLIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Add to Wishlist
    case B2C_ADD_TO_WISHLIST_LOADING:
      return {
        ...state,
        addToWishlistLoading: true,
        addToWishlistError: null,
      };
    case B2C_ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        addToWishlistLoading: false,
        addToWishlistError: null,
      };
    case B2C_ADD_TO_WISHLIST_ERROR:
      return {
        ...state,
        addToWishlistLoading: false,
        addToWishlistError: action.payload,
      };

    // Remove from Wishlist
    case B2C_REMOVE_FROM_WISHLIST_LOADING:
      return {
        ...state,
        removeFromWishlistLoading: true,
        removeFromWishlistError: null,
      };
    case B2C_REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        removeFromWishlistLoading: false,
        removeFromWishlistError: null,
      };
    case B2C_REMOVE_FROM_WISHLIST_ERROR:
      return {
        ...state,
        removeFromWishlistLoading: false,
        removeFromWishlistError: action.payload,
      };

    // Clear Wishlist
    case B2C_CLEAR_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: [],
      };

    default:
      return state;
  }
};

export default b2cWishlistReducer;
