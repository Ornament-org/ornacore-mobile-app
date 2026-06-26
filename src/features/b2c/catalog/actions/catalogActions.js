import { b2cApi } from '../../../../services/api';

// Action Types
export const B2C_CATALOG_LOADING = 'B2C_CATALOG_LOADING';
export const B2C_CATALOG_SUCCESS = 'B2C_CATALOG_SUCCESS';
export const B2C_CATALOG_ERROR = 'B2C_CATALOG_ERROR';

export const B2C_PRODUCTS_LOADING = 'B2C_PRODUCTS_LOADING';
export const B2C_PRODUCTS_SUCCESS = 'B2C_PRODUCTS_SUCCESS';
export const B2C_PRODUCTS_ERROR = 'B2C_PRODUCTS_ERROR';

export const B2C_PRODUCT_DETAILS_LOADING = 'B2C_PRODUCT_DETAILS_LOADING';
export const B2C_PRODUCT_DETAILS_SUCCESS = 'B2C_PRODUCT_DETAILS_SUCCESS';
export const B2C_PRODUCT_DETAILS_ERROR = 'B2C_PRODUCT_DETAILS_ERROR';

export const B2C_SEARCH_LOADING = 'B2C_SEARCH_LOADING';
export const B2C_SEARCH_SUCCESS = 'B2C_SEARCH_SUCCESS';
export const B2C_SEARCH_ERROR = 'B2C_SEARCH_ERROR';

export const B2C_FEATURED_LOADING = 'B2C_FEATURED_LOADING';
export const B2C_FEATURED_SUCCESS = 'B2C_FEATURED_SUCCESS';
export const B2C_FEATURED_ERROR = 'B2C_FEATURED_ERROR';

export const B2C_NEW_ARRIVALS_LOADING = 'B2C_NEW_ARRIVALS_LOADING';
export const B2C_NEW_ARRIVALS_SUCCESS = 'B2C_NEW_ARRIVALS_SUCCESS';
export const B2C_NEW_ARRIVALS_ERROR = 'B2C_NEW_ARRIVALS_ERROR';

// Catalog Actions
export const fetchB2CCategories = () => async (dispatch) => {
  dispatch({ type: B2C_CATALOG_LOADING });
  try {
    const response = await b2cApi.catalog.getCategories();
    dispatch({
      type: B2C_CATALOG_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_CATALOG_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2CProductsByCategory = (categoryId, params = {}) => async (dispatch) => {
  dispatch({ type: B2C_PRODUCTS_LOADING });
  try {
    const response = await b2cApi.catalog.getProductsByCategory(categoryId, params);
    dispatch({
      type: B2C_PRODUCTS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_PRODUCTS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2CAllProducts = (params = {}) => async (dispatch) => {
  dispatch({ type: B2C_PRODUCTS_LOADING });
  try {
    const response = await b2cApi.catalog.getAllProducts(params);
    dispatch({
      type: B2C_PRODUCTS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_PRODUCTS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2CProductDetails = (productId) => async (dispatch) => {
  dispatch({ type: B2C_PRODUCT_DETAILS_LOADING });
  try {
    const response = await b2cApi.catalog.getProductDetails(productId);
    dispatch({
      type: B2C_PRODUCT_DETAILS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_PRODUCT_DETAILS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const searchB2CProducts = (query, params = {}) => async (dispatch) => {
  dispatch({ type: B2C_SEARCH_LOADING });
  try {
    const response = await b2cApi.catalog.searchProducts(query, params);
    dispatch({
      type: B2C_SEARCH_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_SEARCH_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2CFeaturedProducts = (params = {}) => async (dispatch) => {
  dispatch({ type: B2C_FEATURED_LOADING });
  try {
    const response = await b2cApi.catalog.getFeaturedProducts(params);
    dispatch({
      type: B2C_FEATURED_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_FEATURED_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2CNewArrivals = (params = {}) => async (dispatch) => {
  dispatch({ type: B2C_NEW_ARRIVALS_LOADING });
  try {
    const response = await b2cApi.catalog.getNewArrivals(params);
    dispatch({
      type: B2C_NEW_ARRIVALS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_NEW_ARRIVALS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2CProductReviews = (productId, params = {}) => async (dispatch) => {
  try {
    const response = await b2cApi.catalog.getProductReviews(productId, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addB2CProductReview = (productId, data) => async (dispatch) => {
  try {
    const response = await b2cApi.catalog.addProductReview(productId, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
