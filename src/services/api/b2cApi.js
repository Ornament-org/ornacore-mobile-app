import apiClient from '../apiClient';

/**
 * B2C API Endpoints
 * All B2C-related API calls are defined here
 */

// B2C Catalog APIs
export const b2cCatalogApi = {
  // Get all catalog categories
  getCategories: () => apiClient.get('/b2c/catalog/categories'),
  
  // Get products by category
  getProductsByCategory: (categoryId, params = {}) => 
    apiClient.get(`/b2c/catalog/categories/${categoryId}/products`, { params }),
  
  // Get all products with filters
  getAllProducts: (params = {}) => 
    apiClient.get('/b2c/catalog/products', { params }),
  
  // Get product details
  getProductDetails: (productId) => 
    apiClient.get(`/b2c/catalog/products/${productId}`),
  
  // Get featured products
  getFeaturedProducts: (params = {}) => 
    apiClient.get('/b2c/catalog/featured', { params }),
  
  // Get new arrivals
  getNewArrivals: (params = {}) => 
    apiClient.get('/b2c/catalog/new-arrivals', { params }),
  
  // Search products
  searchProducts: (query, params = {}) => 
    apiClient.get('/b2c/catalog/search', { params: { q: query, ...params } }),
  
  // Get product reviews
  getProductReviews: (productId, params = {}) => 
    apiClient.get(`/b2c/catalog/products/${productId}/reviews`, { params }),
  
  // Add product review
  addProductReview: (productId, data) => 
    apiClient.post(`/b2c/catalog/products/${productId}/reviews`, data),
};

// B2C Cart APIs
export const b2cCartApi = {
  // Get cart items
  getCart: () => apiClient.get('/b2c/cart'),
  
  // Add item to cart
  addToCart: (data) => apiClient.post('/b2c/cart/items', data),
  
  // Update cart item
  updateCartItem: (itemId, data) => 
    apiClient.put(`/b2c/cart/items/${itemId}`, data),
  
  // Remove cart item
  removeCartItem: (itemId) => 
    apiClient.delete(`/b2c/cart/items/${itemId}`),
  
  // Clear cart
  clearCart: () => apiClient.delete('/b2c/cart'),
  
  // Apply coupon
  applyCoupon: (code) => 
    apiClient.post('/b2c/cart/coupon', { code }),
  
  // Remove coupon
  removeCoupon: () => apiClient.delete('/b2c/cart/coupon'),
};

// B2C Wishlist APIs
export const b2cWishlistApi = {
  // Get wishlist items
  getWishlist: () => apiClient.get('/b2c/wishlist'),
  
  // Add to wishlist
  addToWishlist: (productId) => 
    apiClient.post('/b2c/wishlist/items', { product_id: productId }),
  
  // Remove from wishlist
  removeFromWishlist: (itemId) => 
    apiClient.delete(`/b2c/wishlist/items/${itemId}`),
  
  // Clear wishlist
  clearWishlist: () => apiClient.delete('/b2c/wishlist'),
  
  // Move to cart
  moveToCart: (itemId) => 
    apiClient.post(`/b2c/wishlist/items/${itemId}/move-to-cart`),
};

// B2C Order APIs
export const b2cOrderApi = {
  // Get all orders
  getOrders: (params = {}) => 
    apiClient.get('/b2c/orders', { params }),
  
  // Get order details
  getOrderDetails: (orderId) => 
    apiClient.get(`/b2c/orders/${orderId}`),
  
  // Create order
  createOrder: (data) => apiClient.post('/b2c/orders', data),
  
  // Cancel order
  cancelOrder: (orderId) => 
    apiClient.post(`/b2c/orders/${orderId}/cancel`),
  
  // Return order
  returnOrder: (orderId, data) => 
    apiClient.post(`/b2c/orders/${orderId}/return`, data),
  
  // Track order
  trackOrder: (orderId) => 
    apiClient.get(`/b2c/orders/${orderId}/tracking`),
  
  // Get order history
  getOrderHistory: (params = {}) => 
    apiClient.get('/b2c/orders/history', { params }),
};

// B2C Checkout APIs
export const b2cCheckoutApi = {
  // Get shipping methods
  getShippingMethods: (params = {}) => 
    apiClient.get('/b2c/checkout/shipping-methods', { params }),
  
  // Calculate shipping
  calculateShipping: (data) => 
    apiClient.post('/b2c/checkout/shipping-calculate', data),
  
  // Get payment methods
  getPaymentMethods: () => apiClient.get('/b2c/checkout/payment-methods'),
  
  // Process payment
  processPayment: (data) => apiClient.post('/b2c/checkout/payment', data),
  
  // Apply discount code
  applyDiscountCode: (code) => 
    apiClient.post('/b2c/checkout/discount', { code }),
  
  // Validate checkout
  validateCheckout: (data) => 
    apiClient.post('/b2c/checkout/validate', data),
};

// B2C Profile APIs
export const b2cProfileApi = {
  // Get user profile
  getUserProfile: () => apiClient.get('/b2c/profile/user'),
  
  // Update user profile
  updateUserProfile: (data) => 
    apiClient.put('/b2c/profile/user', data),
  
  // Get addresses
  getAddresses: () => apiClient.get('/b2c/profile/addresses'),
  
  // Add address
  addAddress: (data) => apiClient.post('/b2c/profile/addresses', data),
  
  // Update address
  updateAddress: (addressId, data) => 
    apiClient.put(`/b2c/profile/addresses/${addressId}`, data),
  
  // Delete address
  deleteAddress: (addressId) => 
    apiClient.delete(`/b2c/profile/addresses/${addressId}`),
  
  // Set default address
  setDefaultAddress: (addressId, type) => 
    apiClient.put(`/b2c/profile/addresses/${addressId}/default`, { type }),
  
  // Change password
  changePassword: (data) => 
    apiClient.post('/b2c/profile/change-password', data),
};

// B2C Support APIs
export const b2cSupportApi = {
  // Get support tickets
  getTickets: (params = {}) => 
    apiClient.get('/b2c/support/tickets', { params }),
  
  // Create ticket
  createTicket: (data) => apiClient.post('/b2c/support/tickets', data),
  
  // Get ticket details
  getTicketDetails: (ticketId) => 
    apiClient.get(`/b2c/support/tickets/${ticketId}`),
  
  // Add message to ticket
  addMessage: (ticketId, data) => 
    apiClient.post(`/b2c/support/tickets/${ticketId}/messages`, data),
  
  // Get FAQ
  getFAQ: (params = {}) => 
    apiClient.get('/b2c/support/faq', { params }),
};

// B2C Notification APIs
export const b2cNotificationApi = {
  // Get notifications
  getNotifications: (params = {}) => 
    apiClient.get('/b2c/notifications', { params }),
  
  // Mark as read
  markAsRead: (notificationId) => 
    apiClient.put(`/b2c/notifications/${notificationId}/read`),
  
  // Mark all as read
  markAllAsRead: () => apiClient.put('/b2c/notifications/read-all'),
  
  // Update notification preferences
  updatePreferences: (data) => 
    apiClient.put('/b2c/notifications/preferences', data),
};

// Export all B2C APIs
export default {
  catalog: b2cCatalogApi,
  cart: b2cCartApi,
  wishlist: b2cWishlistApi,
  order: b2cOrderApi,
  checkout: b2cCheckoutApi,
  profile: b2cProfileApi,
  support: b2cSupportApi,
  notification: b2cNotificationApi,
};
