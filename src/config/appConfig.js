import env from './env';

// App configuration
const appConfig = {
  ...env,
  
  // App settings
  APP_VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  
  // API settings
  API_TIMEOUT: 30000,
  API_RETRY_COUNT: 3,
  
  // Storage keys
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data',
    ONBOARDING_STEP: 'onboarding_step',
    SELECTED_METAL: 'selected_metal',
    RECENT_SEARCHES: 'recent_searches',
    CART_DATA: 'cart_data',
  },
  
  // User types
  USER_TYPES: {
    SHOPKEEPER: 'SHOPKEEPER',
    CUSTOMER: 'CUSTOMER',
    GUEST: 'GUEST',
  },
  
  // Shopkeeper statuses
  SHOPKEEPER_STATUS: {
    DRAFT: 'DRAFT',
    PENDING_REVIEW: 'PENDING_REVIEW',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    SUSPENDED: 'SUSPENDED',
    BLOCKED: 'BLOCKED',
  },
  
  // Order statuses
  ORDER_STATUS: {
    REQUESTED: 'REQUESTED',
    CONFIRMED: 'CONFIRMED',
    PACKED: 'PACKED',
    DISPATCHED: 'DISPATCHED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
  },
  
  // Payment statuses
  PAYMENT_STATUS: {
    UNPAID: 'UNPAID',
    PARTIALLY_PAID: 'PARTIALLY_PAID',
    PAID: 'PAID',
    CREDIT: 'CREDIT',
    REFUNDED: 'REFUNDED',
  },
  
  // Metal types
  METAL_TYPES: {
    GOLD: 'gold',
    SILVER: 'silver',
    DIAMOND: 'diamond',
  },
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Image settings
  IMAGE_QUALITY: 0.8,
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  
  // Date formats
  DATE_FORMATS: {
    DISPLAY: 'DD MMM YYYY',
    DISPLAY_WITH_TIME: 'DD MMM YYYY, HH:mm',
    API: 'YYYY-MM-DD',
    API_WITH_TIME: 'YYYY-MM-DD HH:mm:ss',
  },
  
  // Currency
  CURRENCY: 'INR',
  CURRENCY_SYMBOL: '₹',
  
  // Validation
  VALIDATION: {
    MOBILE_MIN_LENGTH: 10,
    MOBILE_MAX_LENGTH: 15,
    PASSWORD_MIN_LENGTH: 8,
    PINCODE_LENGTH: 6,
    GST_LENGTH: 15,
  },
};

export default appConfig;
