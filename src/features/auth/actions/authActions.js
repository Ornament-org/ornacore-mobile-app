import { authApi } from '../../../services/api';
import { tokenService } from '../../../services/tokenService';

const getApiPayload = (response) => response?.data?.data ?? response?.data ?? {};

const persistSession = async (response) => {
  const payload = getApiPayload(response);
  if (payload.accessToken && payload.refreshToken) {
    await tokenService.setTokens(payload.accessToken, payload.refreshToken);
  }
  return payload;
};

// Action Types
export const SHOPKEEPER_REGISTER_LOADING = 'SHOPKEEPER_REGISTER_LOADING';
export const SHOPKEEPER_REGISTER_SUCCESS = 'SHOPKEEPER_REGISTER_SUCCESS';
export const SHOPKEEPER_REGISTER_ERROR = 'SHOPKEEPER_REGISTER_ERROR';

export const SHOPKEEPER_LOGIN_LOADING = 'SHOPKEEPER_LOGIN_LOADING';
export const SHOPKEEPER_LOGIN_SUCCESS = 'SHOPKEEPER_LOGIN_SUCCESS';
export const SHOPKEEPER_LOGIN_ERROR = 'SHOPKEEPER_LOGIN_ERROR';

export const ADMIN_LOGIN_LOADING = 'ADMIN_LOGIN_LOADING';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';
export const ADMIN_LOGIN_ERROR = 'ADMIN_LOGIN_ERROR';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const GET_CURRENT_USER_LOADING = 'GET_CURRENT_USER_LOADING';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR';

export const SHOPKEEPER_PROFILE_STATUS_LOADING = 'SHOPKEEPER_PROFILE_STATUS_LOADING';
export const SHOPKEEPER_PROFILE_STATUS_SUCCESS = 'SHOPKEEPER_PROFILE_STATUS_SUCCESS';
export const SHOPKEEPER_PROFILE_STATUS_ERROR = 'SHOPKEEPER_PROFILE_STATUS_ERROR';

export const AUTH_BOOTSTRAP_LOADING = 'AUTH_BOOTSTRAP_LOADING';
export const AUTH_BOOTSTRAP_SUCCESS = 'AUTH_BOOTSTRAP_SUCCESS';
export const AUTH_BOOTSTRAP_GUEST = 'AUTH_BOOTSTRAP_GUEST';
export const AUTH_BOOTSTRAP_ERROR = 'AUTH_BOOTSTRAP_ERROR';

// App Session Bootstrap
export const bootstrapAuth = () => async (dispatch) => {
  dispatch({ type: AUTH_BOOTSTRAP_LOADING });

  try {
    const hasToken = await tokenService.isAuthenticated();
    if (!hasToken) {
      dispatch({ type: AUTH_BOOTSTRAP_GUEST });
      return null;
    }

    const response = await authApi.getCurrentShopkeeper();
    const payload = getApiPayload(response);
    dispatch({
      type: AUTH_BOOTSTRAP_SUCCESS,
      payload,
    });
    return payload;
  } catch (error) {
    // If shopkeeper is not approved, don't clear tokens - let them see approval screen
    if (error.response?.data?.error?.code === 'SHOPKEEPER_NOT_APPROVED') {
      dispatch({
        type: AUTH_BOOTSTRAP_SUCCESS,
        payload: { 
          user: error.response?.data?.details || {},
          shopkeeperProfile: { status: error.response?.data?.details?.status || 'PENDING_REVIEW' }
        },
      });
      return { shopkeeperProfile: { status: error.response?.data?.details?.status || 'PENDING_REVIEW' } };
    }
    
    await tokenService.clearTokens();
    dispatch({
      type: AUTH_BOOTSTRAP_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    return null;
  }
};

// Shopkeeper Registration Actions
export const registerShopkeeper = (data) => async (dispatch) => {
  dispatch({ type: SHOPKEEPER_REGISTER_LOADING });
  try {
    const response = await authApi.registerShopkeeper(data);
    const payload = await persistSession(response);
    dispatch({
      type: SHOPKEEPER_REGISTER_SUCCESS,
      payload,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: SHOPKEEPER_REGISTER_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Shopkeeper Login Actions
export const shopkeeperLogin = (data) => async (dispatch) => {
  dispatch({ type: SHOPKEEPER_LOGIN_LOADING });
  try {
    const response = await authApi.shopkeeperLogin(data);
    const payload = await persistSession(response);
    dispatch({
      type: SHOPKEEPER_LOGIN_SUCCESS,
      payload,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: SHOPKEEPER_LOGIN_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Admin Login Actions
export const adminLogin = (data) => async (dispatch) => {
  dispatch({ type: ADMIN_LOGIN_LOADING });
  try {
    const response = await authApi.adminLogin(data);
    const payload = await persistSession(response);
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Logout Actions
export const logout = (data) => async (dispatch) => {
  const refreshToken = data?.refreshToken || await tokenService.getRefreshToken();
  try {
    await tokenService.clearTokens();
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }

  if (refreshToken) {
    authApi.logoutShopkeeper({ refreshToken }).catch((error) => {
      console.warn('Backend logout failed:', error.response?.data?.message || error.message);
    });
  }
};

// Get Current User Actions
export const getCurrentUser = () => async (dispatch) => {
  dispatch({ type: GET_CURRENT_USER_LOADING });
  try {
    const response = await authApi.getCurrentShopkeeper();
    dispatch({
      type: GET_CURRENT_USER_SUCCESS,
      payload: getApiPayload(response),
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: GET_CURRENT_USER_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchShopkeeperProfileStatus = () => async (dispatch) => {
  dispatch({ type: SHOPKEEPER_PROFILE_STATUS_LOADING });
  try {
    const response = await authApi.getShopkeeperProfile();
    const payload = getApiPayload(response);
    dispatch({
      type: SHOPKEEPER_PROFILE_STATUS_SUCCESS,
      payload,
    });
    return payload;
  } catch (error) {
    dispatch({
      type: SHOPKEEPER_PROFILE_STATUS_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};
