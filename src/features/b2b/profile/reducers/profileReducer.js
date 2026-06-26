import {
  B2B_BUSINESS_PROFILE_LOADING,
  B2B_BUSINESS_PROFILE_SUCCESS,
  B2B_BUSINESS_PROFILE_ERROR,
  B2B_USER_PROFILE_LOADING,
  B2B_USER_PROFILE_SUCCESS,
  B2B_USER_PROFILE_ERROR,
  B2B_ADDRESSES_LOADING,
  B2B_ADDRESSES_SUCCESS,
  B2B_ADDRESSES_ERROR,
  B2B_UPDATE_PROFILE_LOADING,
  B2B_UPDATE_PROFILE_SUCCESS,
  B2B_UPDATE_PROFILE_ERROR,
} from '../actions/profileActions';

const initialState = {
  businessProfile: null,
  userProfile: null,
  addresses: [],
  businessProfileLoading: false,
  userProfileLoading: false,
  addressesLoading: false,
  updateProfileLoading: false,
  businessProfileError: null,
  userProfileError: null,
  addressesError: null,
  updateProfileError: null,
};

const b2bProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    // Business Profile
    case B2B_BUSINESS_PROFILE_LOADING:
      return {
        ...state,
        businessProfileLoading: true,
        businessProfileError: null,
      };
    case B2B_BUSINESS_PROFILE_SUCCESS:
      return {
        ...state,
        businessProfileLoading: false,
        businessProfile: action.payload,
        businessProfileError: null,
      };
    case B2B_BUSINESS_PROFILE_ERROR:
      return {
        ...state,
        businessProfileLoading: false,
        businessProfileError: action.payload,
      };

    // User Profile
    case B2B_USER_PROFILE_LOADING:
      return {
        ...state,
        userProfileLoading: true,
        userProfileError: null,
      };
    case B2B_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfileLoading: false,
        userProfile: action.payload,
        userProfileError: null,
      };
    case B2B_USER_PROFILE_ERROR:
      return {
        ...state,
        userProfileLoading: false,
        userProfileError: action.payload,
      };

    // Addresses
    case B2B_ADDRESSES_LOADING:
      return {
        ...state,
        addressesLoading: true,
        addressesError: null,
      };
    case B2B_ADDRESSES_SUCCESS:
      return {
        ...state,
        addressesLoading: false,
        addresses: action.payload,
        addressesError: null,
      };
    case B2B_ADDRESSES_ERROR:
      return {
        ...state,
        addressesLoading: false,
        addressesError: action.payload,
      };

    // Update Profile
    case B2B_UPDATE_PROFILE_LOADING:
      return {
        ...state,
        updateProfileLoading: true,
        updateProfileError: null,
      };
    case B2B_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileError: null,
      };
    case B2B_UPDATE_PROFILE_ERROR:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileError: action.payload,
      };

    default:
      return state;
  }
};

export default b2bProfileReducer;
