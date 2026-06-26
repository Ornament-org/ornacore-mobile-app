import { b2cApi } from '../../../../services/api';

// Action Types
export const B2C_USER_PROFILE_LOADING = 'B2C_USER_PROFILE_LOADING';
export const B2C_USER_PROFILE_SUCCESS = 'B2C_USER_PROFILE_SUCCESS';
export const B2C_USER_PROFILE_ERROR = 'B2C_USER_PROFILE_ERROR';

export const B2C_ADDRESSES_LOADING = 'B2C_ADDRESSES_LOADING';
export const B2C_ADDRESSES_SUCCESS = 'B2C_ADDRESSES_SUCCESS';
export const B2C_ADDRESSES_ERROR = 'B2C_ADDRESSES_ERROR';

export const B2C_UPDATE_PROFILE_LOADING = 'B2C_UPDATE_PROFILE_LOADING';
export const B2C_UPDATE_PROFILE_SUCCESS = 'B2C_UPDATE_PROFILE_SUCCESS';
export const B2C_UPDATE_PROFILE_ERROR = 'B2C_UPDATE_PROFILE_ERROR';

export const B2C_CHANGE_PASSWORD_LOADING = 'B2C_CHANGE_PASSWORD_LOADING';
export const B2C_CHANGE_PASSWORD_SUCCESS = 'B2C_CHANGE_PASSWORD_SUCCESS';
export const B2C_CHANGE_PASSWORD_ERROR = 'B2C_CHANGE_PASSWORD_ERROR';

// Profile Actions
export const fetchB2CUserProfile = () => async (dispatch) => {
  dispatch({ type: B2C_USER_PROFILE_LOADING });
  try {
    const response = await b2cApi.profile.getUserProfile();
    dispatch({
      type: B2C_USER_PROFILE_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_USER_PROFILE_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const updateB2CUserProfile = (data) => async (dispatch) => {
  dispatch({ type: B2C_UPDATE_PROFILE_LOADING });
  try {
    const response = await b2cApi.profile.updateUserProfile(data);
    dispatch({
      type: B2C_UPDATE_PROFILE_SUCCESS,
      payload: response.data.data,
    });
    // Refresh profile after update
    dispatch(fetchB2CUserProfile());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_UPDATE_PROFILE_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2CAddresses = () => async (dispatch) => {
  dispatch({ type: B2C_ADDRESSES_LOADING });
  try {
    const response = await b2cApi.profile.getAddresses();
    dispatch({
      type: B2C_ADDRESSES_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_ADDRESSES_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const addB2CAddress = (data) => async (dispatch) => {
  try {
    const response = await b2cApi.profile.addAddress(data);
    // Refresh addresses after adding
    dispatch(fetchB2CAddresses());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateB2CAddress = (addressId, data) => async (dispatch) => {
  try {
    const response = await b2cApi.profile.updateAddress(addressId, data);
    // Refresh addresses after updating
    dispatch(fetchB2CAddresses());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteB2CAddress = (addressId) => async (dispatch) => {
  try {
    const response = await b2cApi.profile.deleteAddress(addressId);
    // Refresh addresses after deleting
    dispatch(fetchB2CAddresses());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setB2CDefaultAddress = (addressId, type) => async (dispatch) => {
  try {
    const response = await b2cApi.profile.setDefaultAddress(addressId, type);
    // Refresh addresses after setting default
    dispatch(fetchB2CAddresses());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeB2CPassword = (data) => async (dispatch) => {
  dispatch({ type: B2C_CHANGE_PASSWORD_LOADING });
  try {
    const response = await b2cApi.profile.changePassword(data);
    dispatch({
      type: B2C_CHANGE_PASSWORD_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2C_CHANGE_PASSWORD_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};
