import { b2bApi } from '../../../../services/api';

// Action Types
export const B2B_CATALOG_LOADING = 'B2B_CATALOG_LOADING';
export const B2B_CATALOG_SUCCESS = 'B2B_CATALOG_SUCCESS';
export const B2B_CATALOG_ERROR = 'B2B_CATALOG_ERROR';

export const B2B_PRODUCTS_LOADING = 'B2B_PRODUCTS_LOADING';
export const B2B_PRODUCTS_SUCCESS = 'B2B_PRODUCTS_SUCCESS';
export const B2B_PRODUCTS_ERROR = 'B2B_PRODUCTS_ERROR';

export const B2B_PRODUCT_DETAILS_LOADING = 'B2B_PRODUCT_DETAILS_LOADING';
export const B2B_PRODUCT_DETAILS_SUCCESS = 'B2B_PRODUCT_DETAILS_SUCCESS';
export const B2B_PRODUCT_DETAILS_ERROR = 'B2B_PRODUCT_DETAILS_ERROR';

export const B2B_SEARCH_LOADING = 'B2B_SEARCH_LOADING';
export const B2B_SEARCH_SUCCESS = 'B2B_SEARCH_SUCCESS';
export const B2B_SEARCH_ERROR = 'B2B_SEARCH_ERROR';

// Catalog Actions
export const fetchB2BCategories = () => async (dispatch) => {
  dispatch({ type: B2B_CATALOG_LOADING });
  try {
    const response = await b2bApi.catalog.getCategories();
    dispatch({
      type: B2B_CATALOG_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_CATALOG_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2BProductsByCategory = (categoryId, params = {}) => async (dispatch) => {
  dispatch({ type: B2B_PRODUCTS_LOADING });
  try {
    const response = await b2bApi.catalog.getProductsByCategory(categoryId, params);
    dispatch({
      type: B2B_PRODUCTS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_PRODUCTS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2BAllProducts = (params = {}) => async (dispatch) => {
  dispatch({ type: B2B_PRODUCTS_LOADING });
  try {
    const response = await b2bApi.catalog.getAllProducts(params);
    dispatch({
      type: B2B_PRODUCTS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_PRODUCTS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2BProductDetails = (productId) => async (dispatch) => {
  dispatch({ type: B2B_PRODUCT_DETAILS_LOADING });
  try {
    const response = await b2bApi.catalog.getProductDetails(productId);
    dispatch({
      type: B2B_PRODUCT_DETAILS_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_PRODUCT_DETAILS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const searchB2BProducts = (query, params = {}) => async (dispatch) => {
  dispatch({ type: B2B_SEARCH_LOADING });
  try {
    const response = await b2bApi.catalog.searchProducts(query, params);
    dispatch({
      type: B2B_SEARCH_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_SEARCH_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};
