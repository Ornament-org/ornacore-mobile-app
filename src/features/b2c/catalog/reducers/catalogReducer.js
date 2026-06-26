import {
  B2C_CATALOG_LOADING,
  B2C_CATALOG_SUCCESS,
  B2C_CATALOG_ERROR,
  B2C_PRODUCTS_LOADING,
  B2C_PRODUCTS_SUCCESS,
  B2C_PRODUCTS_ERROR,
  B2C_PRODUCT_DETAILS_LOADING,
  B2C_PRODUCT_DETAILS_SUCCESS,
  B2C_PRODUCT_DETAILS_ERROR,
  B2C_SEARCH_LOADING,
  B2C_SEARCH_SUCCESS,
  B2C_SEARCH_ERROR,
  B2C_FEATURED_LOADING,
  B2C_FEATURED_SUCCESS,
  B2C_FEATURED_ERROR,
  B2C_NEW_ARRIVALS_LOADING,
  B2C_NEW_ARRIVALS_SUCCESS,
  B2C_NEW_ARRIVALS_ERROR,
} from '../actions/catalogActions';

const initialState = {
  categories: [],
  products: [],
  productDetails: null,
  searchResults: [],
  featuredProducts: [],
  newArrivals: [],
  loading: false,
  productsLoading: false,
  productDetailsLoading: false,
  searchLoading: false,
  featuredLoading: false,
  newArrivalsLoading: false,
  error: null,
  productsError: null,
  productDetailsError: null,
  searchError: null,
  featuredError: null,
  newArrivalsError: null,
};

const b2cCatalogReducer = (state = initialState, action) => {
  switch (action.type) {
    // Catalog Categories
    case B2C_CATALOG_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case B2C_CATALOG_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null,
      };
    case B2C_CATALOG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Products
    case B2C_PRODUCTS_LOADING:
      return {
        ...state,
        productsLoading: true,
        productsError: null,
      };
    case B2C_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsLoading: false,
        products: action.payload,
        productsError: null,
      };
    case B2C_PRODUCTS_ERROR:
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload,
      };

    // Product Details
    case B2C_PRODUCT_DETAILS_LOADING:
      return {
        ...state,
        productDetailsLoading: true,
        productDetailsError: null,
      };
    case B2C_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetailsLoading: false,
        productDetails: action.payload,
        productDetailsError: null,
      };
    case B2C_PRODUCT_DETAILS_ERROR:
      return {
        ...state,
        productDetailsLoading: false,
        productDetailsError: action.payload,
      };

    // Search
    case B2C_SEARCH_LOADING:
      return {
        ...state,
        searchLoading: true,
        searchError: null,
      };
    case B2C_SEARCH_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchResults: action.payload,
        searchError: null,
      };
    case B2C_SEARCH_ERROR:
      return {
        ...state,
        searchLoading: false,
        searchError: action.payload,
      };

    // Featured Products
    case B2C_FEATURED_LOADING:
      return {
        ...state,
        featuredLoading: true,
        featuredError: null,
      };
    case B2C_FEATURED_SUCCESS:
      return {
        ...state,
        featuredLoading: false,
        featuredProducts: action.payload,
        featuredError: null,
      };
    case B2C_FEATURED_ERROR:
      return {
        ...state,
        featuredLoading: false,
        featuredError: action.payload,
      };

    // New Arrivals
    case B2C_NEW_ARRIVALS_LOADING:
      return {
        ...state,
        newArrivalsLoading: true,
        newArrivalsError: null,
      };
    case B2C_NEW_ARRIVALS_SUCCESS:
      return {
        ...state,
        newArrivalsLoading: false,
        newArrivals: action.payload,
        newArrivalsError: null,
      };
    case B2C_NEW_ARRIVALS_ERROR:
      return {
        ...state,
        newArrivalsLoading: false,
        newArrivalsError: action.payload,
      };

    default:
      return state;
  }
};

export default b2cCatalogReducer;
