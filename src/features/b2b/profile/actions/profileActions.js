import { b2bApi } from '../../../../services/api';

// Action Types
export const B2B_BUSINESS_PROFILE_LOADING = 'B2B_BUSINESS_PROFILE_LOADING';
export const B2B_BUSINESS_PROFILE_SUCCESS = 'B2B_BUSINESS_PROFILE_SUCCESS';
export const B2B_BUSINESS_PROFILE_ERROR = 'B2B_BUSINESS_PROFILE_ERROR';

export const B2B_USER_PROFILE_LOADING = 'B2B_USER_PROFILE_LOADING';
export const B2B_USER_PROFILE_SUCCESS = 'B2B_USER_PROFILE_SUCCESS';
export const B2B_USER_PROFILE_ERROR = 'B2B_USER_PROFILE_ERROR';

export const B2B_ADDRESSES_LOADING = 'B2B_ADDRESSES_LOADING';
export const B2B_ADDRESSES_SUCCESS = 'B2B_ADDRESSES_SUCCESS';
export const B2B_ADDRESSES_ERROR = 'B2B_ADDRESSES_ERROR';

export const B2B_UPDATE_PROFILE_LOADING = 'B2B_UPDATE_PROFILE_LOADING';
export const B2B_UPDATE_PROFILE_SUCCESS = 'B2B_UPDATE_PROFILE_SUCCESS';
export const B2B_UPDATE_PROFILE_ERROR = 'B2B_UPDATE_PROFILE_ERROR';

// Profile Actions
export const fetchB2BBusinessProfile = () => async (dispatch) => {
  dispatch({ type: B2B_BUSINESS_PROFILE_LOADING });
  try {
    const response = await b2bApi.profile.getBusinessProfile();
    dispatch({
      type: B2B_BUSINESS_PROFILE_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_BUSINESS_PROFILE_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const updateB2BBusinessProfile = (data) => async (dispatch) => {
  dispatch({ type: B2B_UPDATE_PROFILE_LOADING });
  try {
    const response = await b2bApi.profile.updateBusinessProfile(data);
    dispatch({
      type: B2B_UPDATE_PROFILE_SUCCESS,
      payload: response.data.data,
    });
    // Refresh profile after update
    dispatch(fetchB2BBusinessProfile());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_UPDATE_PROFILE_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2BUserProfile = () => async (dispatch) => {
  dispatch({ type: B2B_USER_PROFILE_LOADING });
  try {
    const response = await b2bApi.profile.getUserProfile();
    dispatch({
      type: B2B_USER_PROFILE_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_USER_PROFILE_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const updateB2BUserProfile = (data) => async (dispatch) => {
  dispatch({ type: B2B_UPDATE_PROFILE_LOADING });
  try {
    const response = await b2bApi.profile.updateUserProfile(data);
    dispatch({
      type: B2B_UPDATE_PROFILE_SUCCESS,
      payload: response.data.data,
    });
    // Refresh profile after update
    dispatch(fetchB2BUserProfile());
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_UPDATE_PROFILE_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchB2BAddresses = () => async (dispatch) => {
  dispatch({ type: B2B_ADDRESSES_LOADING });
  try {
    const response = await b2bApi.profile.getAddresses();
    dispatch({
      type: B2B_ADDRESSES_SUCCESS,
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: B2B_ADDRESSES_ERROR,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const addB2BAddress = (data) => async (dispatch) => {
  try {
    const response = await b2bApi.profile.addAddress(data);
    // Refresh addresses after adding
    dispatch(fetchB2BAddresses());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateB2BAddress = (addressId, data) => async (dispatch) => {
  try {
    const response = await b2bApi.profile.updateAddress(addressId, data);
    // Refresh addresses after updating
    dispatch(fetchB2BAddresses());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteB2BAddress = (addressId) => async (dispatch) => {
  try {
    const response = await b2bApi.profile.deleteAddress(addressId);
    // Refresh addresses after deleting
    dispatch(fetchB2BAddresses());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadB2BDocuments = (data) => async (dispatch) => {
  try {
    const response = await b2bApi.profile.uploadDocuments(data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
