import {
  B2C_USER_PROFILE_LOADING,
  B2C_USER_PROFILE_SUCCESS,
  B2C_USER_PROFILE_ERROR,
  B2C_ADDRESSES_LOADING,
  B2C_ADDRESSES_SUCCESS,
  B2C_ADDRESSES_ERROR,
  B2C_UPDATE_PROFILE_LOADING,
  B2C_UPDATE_PROFILE_SUCCESS,
  B2C_UPDATE_PROFILE_ERROR,
  B2C_CHANGE_PASSWORD_LOADING,
  B2C_CHANGE_PASSWORD_SUCCESS,
  B2C_CHANGE_PASSWORD_ERROR,
} from '../actions/profileActions';

const initialState = {
  userProfile: null,
  addresses: [],
  userProfileLoading: false,
  addressesLoading: false,
  updateProfileLoading: false,
  changePasswordLoading: false,
  userProfileError: null,
  addressesError: null,
  updateProfileError: null,
  changePasswordError: null,
};

const b2cProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    // User Profile
    case B2C_USER_PROFILE_LOADING:
      return {
        ...state,
        userProfileLoading: true,
        userProfileError: null,
      };
    case B2C_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfileLoading: false,
        userProfile: action.payload,
        userProfileError: null,
      };
    case B2C_USER_PROFILE_ERROR:
      return {
        ...state,
        userProfileLoading: false,
        userProfileError: action.payload,
      };

    // Addresses
    case B2C_ADDRESSES_LOADING:
      return {
        ...state,
        addressesLoading: true,
        addressesError: null,
      };
    case B2C_ADDRESSES_SUCCESS:
      return {
        ...state,
        addressesLoading: false,
        addresses: action.payload,
        addressesError: null,
      };
    case B2C_ADDRESSES_ERROR:
      return {
        ...state,
        addressesLoading: false,
        addressesError: action.payload,
      };

    // Update Profile
    case B2C_UPDATE_PROFILE_LOADING:
      return {
        ...state,
        updateProfileLoading: true,
        updateProfileError: null,
      };
    case B2C_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileError: null,
      };
    case B2C_UPDATE_PROFILE_ERROR:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileError: action.payload,
      };

    // Change Password
    case B2C_CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        changePasswordLoading: true,
        changePasswordError: null,
      };
    case B2C_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordError: null,
      };
    case B2C_CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordError: action.payload,
      };

    default:
      return state;
  }
};

export default b2cProfileReducer;
