import {
  SHOPKEEPER_REGISTER_LOADING,
  SHOPKEEPER_REGISTER_SUCCESS,
  SHOPKEEPER_REGISTER_ERROR,
  SHOPKEEPER_LOGIN_LOADING,
  SHOPKEEPER_LOGIN_SUCCESS,
  SHOPKEEPER_LOGIN_ERROR,
  ADMIN_LOGIN_LOADING,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  GET_CURRENT_USER_LOADING,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
  SHOPKEEPER_PROFILE_STATUS_LOADING,
  SHOPKEEPER_PROFILE_STATUS_SUCCESS,
  SHOPKEEPER_PROFILE_STATUS_ERROR,
  AUTH_BOOTSTRAP_LOADING,
  AUTH_BOOTSTRAP_SUCCESS,
  AUTH_BOOTSTRAP_GUEST,
  AUTH_BOOTSTRAP_ERROR,
} from '../actions/authActions';

const initialState = {
  user: null,
  shopkeeperProfile: null,
  accountType: null,
  approvalStatus: null,
  sessionChecked: false,
  bootstrapLoading: false,
  loading: false,
  registerLoading: false,
  loginLoading: false,
  adminLoginLoading: false,
  getCurrentUserLoading: false,
  profileStatusLoading: false,
  error: null,
  registerError: null,
  loginError: null,
  adminLoginError: null,
  getCurrentUserError: null,
  profileStatusError: null,
  bootstrapError: null,
  isAuthenticated: false,
};

const getShopkeeperProfile = (payload = {}) => (
  payload.shopkeeperProfile
  || payload.shopkeeper
  || payload.profile
  || payload.user?.shopkeeperProfile
  || payload.user?.shopkeeper
  || null
);

const getApprovalStatus = (payload = {}, fallback) => (
  payload.approvalStatus
  || payload.status
  || payload.user?.approvalStatus
  || getShopkeeperProfile(payload)?.approvalStatus
  || getShopkeeperProfile(payload)?.status
  || payload.user?.status
  || fallback
);

const getUser = (payload = {}) => payload.user || payload.account || payload;
const getAccountType = (payload = {}, fallback = 'shopkeeper') => (
  payload.accountType
  || payload.role
  || payload.actorType
  || payload.user?.accountType
  || payload.user?.role
  || payload.user?.actorType
  || fallback
);

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // App Session Bootstrap
    case AUTH_BOOTSTRAP_LOADING:
      return {
        ...state,
        bootstrapLoading: true,
        bootstrapError: null,
      };
    case AUTH_BOOTSTRAP_SUCCESS:
      return {
        ...state,
        bootstrapLoading: false,
        sessionChecked: true,
        user: getUser(action.payload),
        shopkeeperProfile: getShopkeeperProfile(action.payload),
        accountType: getAccountType(action.payload),
        approvalStatus: getApprovalStatus(action.payload, 'approved'),
        isAuthenticated: true,
        bootstrapError: null,
      };
    case AUTH_BOOTSTRAP_GUEST:
      return {
        ...state,
        bootstrapLoading: false,
        sessionChecked: true,
        user: null,
        shopkeeperProfile: null,
        accountType: null,
        approvalStatus: null,
        isAuthenticated: false,
        bootstrapError: null,
      };
    case AUTH_BOOTSTRAP_ERROR:
      return {
        ...state,
        bootstrapLoading: false,
        sessionChecked: true,
        user: null,
        shopkeeperProfile: null,
        accountType: null,
        approvalStatus: null,
        isAuthenticated: false,
        bootstrapError: action.payload,
      };

    // Shopkeeper Registration
    case SHOPKEEPER_REGISTER_LOADING:
      return {
        ...state,
        registerLoading: true,
        registerError: null,
      };
    case SHOPKEEPER_REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        user: getUser(action.payload),
        shopkeeperProfile: getShopkeeperProfile(action.payload) || action.payload,
        accountType: getAccountType(action.payload),
        approvalStatus: getApprovalStatus(action.payload, 'pending'),
        sessionChecked: true,
        isAuthenticated: true,
        registerError: null,
      };
    case SHOPKEEPER_REGISTER_ERROR:
      return {
        ...state,
        registerLoading: false,
        registerError: action.payload,
      };

    // Shopkeeper Login
    case SHOPKEEPER_LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
        loginError: null,
      };
    case SHOPKEEPER_LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        user: getUser(action.payload),
        shopkeeperProfile: getShopkeeperProfile(action.payload),
        accountType: getAccountType(action.payload),
        approvalStatus: getApprovalStatus(action.payload, 'approved'),
        sessionChecked: true,
        isAuthenticated: true,
        loginError: null,
      };
    case SHOPKEEPER_LOGIN_ERROR:
      return {
        ...state,
        loginLoading: false,
        loginError: action.payload,
      };

    // Admin Login
    case ADMIN_LOGIN_LOADING:
      return {
        ...state,
        adminLoginLoading: true,
        adminLoginError: null,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        adminLoginLoading: false,
        user: getUser(action.payload),
        accountType: 'admin',
        approvalStatus: null,
        sessionChecked: true,
        isAuthenticated: true,
        adminLoginError: null,
      };
    case ADMIN_LOGIN_ERROR:
      return {
        ...state,
        adminLoginLoading: false,
        adminLoginError: action.payload,
      };

    // Get Current User
    case GET_CURRENT_USER_LOADING:
      return {
        ...state,
        getCurrentUserLoading: true,
        getCurrentUserError: null,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        getCurrentUserLoading: false,
        user: getUser(action.payload),
        shopkeeperProfile: getShopkeeperProfile(action.payload),
        accountType: getAccountType(action.payload),
        approvalStatus: getApprovalStatus(action.payload, 'approved'),
        sessionChecked: true,
        isAuthenticated: true,
        getCurrentUserError: null,
      };
    case GET_CURRENT_USER_ERROR:
      return {
        ...state,
        getCurrentUserLoading: false,
        getCurrentUserError: action.payload,
      };

    case SHOPKEEPER_PROFILE_STATUS_LOADING:
      return {
        ...state,
        profileStatusLoading: true,
        profileStatusError: null,
      };
    case SHOPKEEPER_PROFILE_STATUS_SUCCESS:
      return {
        ...state,
        profileStatusLoading: false,
        shopkeeperProfile: action.payload,
        user: state.user
          ? {
              ...state.user,
              shopkeeper: action.payload,
              shopkeeperProfile: action.payload,
            }
          : state.user,
        approvalStatus: getApprovalStatus(action.payload, state.approvalStatus),
        sessionChecked: true,
        isAuthenticated: true,
        profileStatusError: null,
      };
    case SHOPKEEPER_PROFILE_STATUS_ERROR:
      return {
        ...state,
        profileStatusLoading: false,
        profileStatusError: action.payload,
      };

    // Logout
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        shopkeeperProfile: null,
        accountType: null,
        approvalStatus: null,
        sessionChecked: true,
        isAuthenticated: false,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
