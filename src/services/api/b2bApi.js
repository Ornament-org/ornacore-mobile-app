import apiClient from '../apiClient';

/**
 * B2B API Endpoints
 * All B2B-related API calls are defined here
 */

// B2B Catalog APIs
export const b2bCatalogApi = {
  // Get all catalog categories
  getCategories: () => apiClient.get('/b2b/catalog/categories'),
  
  // Get products by category
  getProductsByCategory: (categoryId, params = {}) => 
    apiClient.get(`/b2b/catalog/categories/${categoryId}/products`, { params }),
  
  // Get all products with filters
  getAllProducts: (params = {}) => 
    apiClient.get('/b2b/catalog/products', { params }),
  
  // Get product details
  getProductDetails: (productId) => 
    apiClient.get(`/b2b/catalog/products/${productId}`),
  
  // Search products
  searchProducts: (query, params = {}) => 
    apiClient.get('/b2b/catalog/search', { params: { q: query, ...params } }),
};

// B2B Cart APIs
export const b2bCartApi = {
  // Get cart items
  getCart: () => apiClient.get('/b2b/cart'),
  
  // Add item to cart
  addToCart: (data) => apiClient.post('/b2b/cart/items', data),
  
  // Update cart item
  updateCartItem: (itemId, data) => 
    apiClient.put(`/b2b/cart/items/${itemId}`, data),
  
  // Remove cart item
  removeCartItem: (itemId) => 
    apiClient.delete(`/b2b/cart/items/${itemId}`),
  
  // Clear cart
  clearCart: () => apiClient.delete('/b2b/cart'),
  
  // Apply bulk discount
  applyBulkDiscount: (data) => 
    apiClient.post('/b2b/cart/bulk-discount', data),
};

// B2B Order APIs
export const b2bOrderApi = {
  // Get all orders
  getOrders: (params = {}) => 
    apiClient.get('/b2b/orders', { params }),
  
  // Get order details
  getOrderDetails: (orderId) => 
    apiClient.get(`/b2b/orders/${orderId}`),
  
  // Create order
  createOrder: (data) => apiClient.post('/b2b/orders', data),
  
  // Cancel order
  cancelOrder: (orderId) => 
    apiClient.post(`/b2b/orders/${orderId}/cancel`),
  
  // Track order
  trackOrder: (orderId) => 
    apiClient.get(`/b2b/orders/${orderId}/tracking`),
  
  // Get order history
  getOrderHistory: (params = {}) => 
    apiClient.get('/b2b/orders/history', { params }),
};

// B2B Payment APIs
export const b2bPaymentApi = {
  // Get payment methods
  getPaymentMethods: () => apiClient.get('/b2b/payments/methods'),
  
  // Create payment
  createPayment: (data) => apiClient.post('/b2b/payments', data),
  
  // Get payment details
  getPaymentDetails: (paymentId) => 
    apiClient.get(`/b2b/payments/${paymentId}`),
  
  // Get payment ledger
  getPaymentLedger: (params = {}) => 
    apiClient.get('/b2b/payments/ledger', { params }),
  
  // Get invoice
  getInvoice: (invoiceId) => 
    apiClient.get(`/b2b/payments/invoices/${invoiceId}`),
};

// B2B Profile APIs
export const b2bProfileApi = {
  // Get shopkeeper profile
  getShopkeeperProfile: () => apiClient.get('/shopkeeper/profile'),

  // Get calculated metal ledger summary
  getMetalLedgerSummary: (params = {}) =>
    apiClient.get('/shopkeeper/ledger/summary', { params }),

  // Update shopkeeper profile
  updateShopkeeperProfile: (data) =>
    apiClient.patch('/shopkeeper/profile', data),

  // Create or update primary shop address
  upsertShopkeeperAddress: (data) =>
    apiClient.put('/shopkeeper/profile/address', data),

  // Submit completed profile for admin approval
  submitShopkeeperForApproval: () =>
    apiClient.post('/shopkeeper/profile/submit-for-approval', {}),

  // Get business profile
  getBusinessProfile: () => apiClient.get('/b2b/profile/business'),
  
  // Update business profile
  updateBusinessProfile: (data) => 
    apiClient.put('/b2b/profile/business', data),
  
  // Get user profile
  getUserProfile: () => apiClient.get('/b2b/profile/user'),
  
  // Update user profile
  updateUserProfile: (data) => 
    apiClient.put('/b2b/profile/user', data),
  
  // Get business addresses
  getAddresses: () => apiClient.get('/b2b/profile/addresses'),
  
  // Add address
  addAddress: (data) => apiClient.post('/b2b/profile/addresses', data),
  
  // Update address
  updateAddress: (addressId, data) => 
    apiClient.put(`/b2b/profile/addresses/${addressId}`, data),
  
  // Delete address
  deleteAddress: (addressId) => 
    apiClient.delete(`/b2b/profile/addresses/${addressId}`),
  
  // Upload business documents
  uploadDocuments: (data) => 
    apiClient.post('/b2b/profile/documents', data),
};

// B2B Support APIs
export const b2bSupportApi = {
  // Get support tickets
  getTickets: (params = {}) => 
    apiClient.get('/b2b/support/tickets', { params }),
  
  // Create ticket
  createTicket: (data) => apiClient.post('/b2b/support/tickets', data),
  
  // Get ticket details
  getTicketDetails: (ticketId) => 
    apiClient.get(`/b2b/support/tickets/${ticketId}`),
  
  // Add message to ticket
  addMessage: (ticketId, data) => 
    apiClient.post(`/b2b/support/tickets/${ticketId}/messages`, data),
};

// B2B Notification APIs
export const b2bNotificationApi = {
  // Get notifications
  getNotifications: (params = {}) => 
    apiClient.get('/b2b/notifications', { params }),
  
  // Mark as read
  markAsRead: (notificationId) => 
    apiClient.put(`/b2b/notifications/${notificationId}/read`),
  
  // Mark all as read
  markAllAsRead: () => apiClient.put('/b2b/notifications/read-all'),
};

// Export all B2B APIs
export default {
  catalog: b2bCatalogApi,
  cart: b2bCartApi,
  order: b2bOrderApi,
  payment: b2bPaymentApi,
  profile: b2bProfileApi,
  support: b2bSupportApi,
  notification: b2bNotificationApi,
};
