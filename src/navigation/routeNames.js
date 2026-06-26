/**
 * Central route names for the app.
 *
 * Root routes are app segments. Nested routes belong to exactly one segment
 * so B2B and B2C can grow independently.
 */
export const routeNames = Object.freeze({
  // Root segments
  public: 'Public',
  splash: 'Splash',
  approval: 'Approval',
  b2b: 'B2B',
  b2c: 'B2C',

  // Public
  publicTabs: 'PublicTabs',
  publicHome: 'PublicHome',

  // B2B auth
  welcome: 'BusinessWelcome',
  login: 'B2BLogin',
  register: 'B2BRegister',
  shopKeeperWelcome: 'ShopkeeperWelcome',
  shopkeeperRegister: 'ShopkeeperRegister',
  forgotPassword: 'B2BForgotPassword',
  completeShopProfile: 'CompleteShopProfile',

  // B2C auth
  customerLogin: 'CustomerLogin',
  customerRegister: 'CustomerRegister',

  // Approval
  pendingApproval: 'PendingApproval',
  rejected: 'Rejected',
  suspended: 'Suspended',

  // B2B stack
  b2bTabs: 'B2BTabs',
  b2bProductList: 'B2BProductList',
  b2bProductDetails: 'B2BProductDetails',
  b2bSearch: 'B2BSearch',
  b2bFilter: 'B2BFilter',
  b2bCart: 'B2BCart',
  b2bCheckout: 'B2BCheckout',
  b2bOrderSuccess: 'B2BOrderSuccess',
  b2bOrderDetails: 'B2BOrderDetails',
  b2bPaymentLedger: 'B2BPaymentLedger',
  b2bEditProfile: 'B2BEditProfile',
  b2bSupport: 'B2BSupport',
  b2bNotifications: 'B2BNotifications',
  
  // B2B Profile sub-screens
  myProfile: 'MyProfile',
  transactions: 'Transactions',
  myOrders: 'MyOrders',
  addresses: 'Addresses',

  // B2C stack
  customerTabs: 'CustomerTabs',
  customerProductList: 'CustomerProductList',
  customerProductDetails: 'CustomerProductDetails',
  customerAddress: 'CustomerAddress',
  customerPayment: 'CustomerPayment',
  customerOrderDetails: 'CustomerOrderDetails',

  // Shared tab labels inside a segment
  home: 'Home',
  catalog: 'Catalog',
  cart: 'Cart',
  shop: 'Shop',
  orders: 'Orders',
  profile: 'Profile',
});
