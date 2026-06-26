import appConfig from '../config/appConfig';

// Export app config constants
export const USER_TYPES = appConfig.USER_TYPES;
export const SHOPKEEPER_STATUS = appConfig.SHOPKEEPER_STATUS;
export const ORDER_STATUS = appConfig.ORDER_STATUS;
export const PAYMENT_STATUS = appConfig.PAYMENT_STATUS;
export const METAL_TYPES = appConfig.METAL_TYPES;

// Screen names for navigation
export const SCREEN_NAMES = {
  // Auth
  WELCOME: 'Welcome',
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  COMPLETE_SHOP_PROFILE: 'CompleteShopProfile',
  
  // Approval
  PENDING_APPROVAL: 'PendingApproval',
  REJECTED: 'Rejected',
  SUSPENDED: 'Suspended',
  
  // B2B
  B2B_HOME: 'B2BHome',
  B2B_CATALOG: 'B2BCatalog',
  B2B_PRODUCT_LIST: 'B2BProductList',
  B2B_PRODUCT_DETAILS: 'B2BProductDetails',
  B2B_SEARCH: 'B2BSearch',
  B2B_FILTER: 'B2BFilter',
  B2B_CART: 'B2BCart',
  B2B_CHECKOUT: 'B2BCheckout',
  B2B_ORDER_SUCCESS: 'B2BOrderSuccess',
  B2B_ORDERS: 'B2BOrders',
  B2B_ORDER_DETAILS: 'B2BOrderDetails',
  B2B_PAYMENT_LEDGER: 'B2BPaymentLedger',
  B2B_PROFILE: 'B2BProfile',
  B2B_EDIT_PROFILE: 'B2BEditProfile',
  B2B_SUPPORT: 'B2BSupport',
  B2B_NOTIFICATIONS: 'B2BNotifications',
  
  // B2C (Future)
  CUSTOMER_HOME: 'CustomerHome',
  CUSTOMER_CATALOG: 'CustomerCatalog',
  CUSTOMER_PRODUCT_LIST: 'CustomerProductList',
  CUSTOMER_PRODUCT_DETAILS: 'CustomerProductDetails',
  CUSTOMER_WISHLIST: 'CustomerWishlist',
  CUSTOMER_CART: 'CustomerCart',
  CUSTOMER_CHECKOUT: 'CustomerCheckout',
  CUSTOMER_ADDRESS: 'CustomerAddress',
  CUSTOMER_PAYMENT: 'CustomerPayment',
  CUSTOMER_ORDERS: 'CustomerOrders',
  CUSTOMER_ORDER_DETAILS: 'CustomerOrderDetails',
  CUSTOMER_PROFILE: 'CustomerProfile',
  CUSTOMER_SUPPORT: 'CustomerSupport',
};

// Tab names
export const TAB_NAMES = {
  HOME: 'Home',
  CATALOG: 'Catalog',
  ORDERS: 'Orders',
  CART: 'Cart',
  PROFILE: 'Profile',
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized. Please login.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input.',
  UNKNOWN_ERROR: 'Something went wrong. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTER_SUCCESS: 'Registration successful',
  PROFILE_UPDATED: 'Profile updated successfully',
  ORDER_PLACED: 'Order placed successfully',
  CART_UPDATED: 'Cart updated successfully',
  ITEM_ADDED: 'Item added to cart',
  ITEM_REMOVED: 'Item removed from cart',
};
