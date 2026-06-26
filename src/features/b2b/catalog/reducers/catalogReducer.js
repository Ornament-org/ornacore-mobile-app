import {
  B2B_CATALOG_LOADING,
  B2B_CATALOG_SUCCESS,
  B2B_CATALOG_ERROR,
  B2B_PRODUCTS_LOADING,
  B2B_PRODUCTS_SUCCESS,
  B2B_PRODUCTS_ERROR,
  B2B_PRODUCT_DETAILS_LOADING,
  B2B_PRODUCT_DETAILS_SUCCESS,
  B2B_PRODUCT_DETAILS_ERROR,
  B2B_SEARCH_LOADING,
  B2B_SEARCH_SUCCESS,
  B2B_SEARCH_ERROR,
} from '../actions/catalogActions';

const initialState = {
  categories: [],
  products: [],
  productDetails: null,
  searchResults: [],
  loading: false,
  productsLoading: false,
  productDetailsLoading: false,
  searchLoading: false,
  error: null,
  productsError: null,
  productDetailsError: null,
  searchError: null,
};

const b2bCatalogReducer = (state = initialState, action) => {
  switch (action.type) {
    // Catalog Categories
    case B2B_CATALOG_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case B2B_CATALOG_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null,
      };
    case B2B_CATALOG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Products
    case B2B_PRODUCTS_LOADING:
      return {
        ...state,
        productsLoading: true,
        productsError: null,
      };
    case B2B_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsLoading: false,
        products: action.payload,
        productsError: null,
      };
    case B2B_PRODUCTS_ERROR:
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload,
      };

    // Product Details
    case B2B_PRODUCT_DETAILS_LOADING:
      return {
        ...state,
        productDetailsLoading: true,
        productDetailsError: null,
      };
    case B2B_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetailsLoading: false,
        productDetails: action.payload,
        productDetailsError: null,
      };
    case B2B_PRODUCT_DETAILS_ERROR:
      return {
        ...state,
        productDetailsLoading: false,
        productDetailsError: action.payload,
      };

    // Search
    case B2B_SEARCH_LOADING:
      return {
        ...state,
        searchLoading: true,
        searchError: null,
      };
    case B2B_SEARCH_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchResults: action.payload,
        searchError: null,
      };
    case B2B_SEARCH_ERROR:
      return {
        ...state,
        searchLoading: false,
        searchError: action.payload,
      };

    default:
      return state;
  }
};

export default b2bCatalogReducer;
