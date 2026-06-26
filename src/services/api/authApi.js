import apiClient from '../apiClient';

/**
 * Auth API Endpoints
 * Authentication related API calls
 */

// Auth APIs
export const authApi = {
  // Shopkeeper Registration
  registerShopkeeper: (data) =>  apiClient.post('/shopkeeper/auth/register', data),
  
  // Shopkeeper Login
  shopkeeperLogin: (data) => 
    apiClient.post('/shopkeeper/auth/login', data),
  
  // Admin Login
  adminLogin: (data) => 
    apiClient.post('/admin/auth/login', data),
  
  // Refresh Token
  refreshShopkeeperToken: (data) =>
    apiClient.post('/shopkeeper/auth/refresh', data),

  refreshAdminToken: (data) =>
    apiClient.post('/admin/auth/refresh', data),
  
  // Logout
  logoutShopkeeper: (data) =>
    apiClient.post('/shopkeeper/auth/logout', data),

  logoutAdmin: (data) =>
    apiClient.post('/admin/auth/logout', data),
  
  // Logout All
  logoutAllShopkeeper: () =>
    apiClient.post('/shopkeeper/auth/logout-all'),

  logoutAllAdmin: () =>
    apiClient.post('/admin/auth/logout-all'),
  
  // Get Current User
  getCurrentShopkeeper: () =>
    apiClient.get('/shopkeeper/auth/me'),

  getShopkeeperProfile: () =>
    apiClient.get('/shopkeeper/profile'),

  getCurrentAdmin: () =>
    apiClient.get('/admin/auth/me'),
  
  // Change Password
  changeShopkeeperPassword: (data) =>
    apiClient.post('/shopkeeper/auth/change-password', data),

  changeAdminPassword: (data) =>
    apiClient.post('/admin/auth/change-password', data),
};

export default authApi;
