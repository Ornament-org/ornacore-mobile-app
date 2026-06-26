import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appConfig from '../config/appConfig';
import { apiLogger } from './apiLogger';

const { ACCESS_TOKEN, REFRESH_TOKEN } = appConfig.STORAGE_KEYS;

// Create axios instance
const apiClient = axios.create({
  baseURL: appConfig.API_BASE_URL,
  timeout: appConfig.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const unwrapApiData = (response) => response?.data?.data ?? response?.data ?? {};

const getRefreshPath = (url = '') =>
  url.startsWith('/admin/') ? '/admin/auth/refresh' : '/shopkeeper/auth/refresh';

const isExpectedShopkeeperApprovalError = (error) =>
  error.response?.data?.error?.code === 'SHOPKEEPER_NOT_APPROVED';

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    config.metadata = { startedAt: Date.now() };
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    apiLogger.request(config);
    return config;
  },
  (error) => {
    apiLogger.error(error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and token refresh
apiClient.interceptors.response.use(
  (response) => {
    apiLogger.response(response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
        if (refreshToken) {
          const response = await axios.post(`${appConfig.API_BASE_URL}${getRefreshPath(originalRequest.url)}`, {
            refreshToken,
          });
          
          const {
            accessToken,
            refreshToken: newRefreshToken,
          } = unwrapApiData(response);

          if (!accessToken || !newRefreshToken) {
            throw new Error('Refresh response did not include new auth tokens');
          }
          
          await Promise.all([
            AsyncStorage.setItem(ACCESS_TOKEN, accessToken),
            AsyncStorage.setItem(REFRESH_TOKEN, newRefreshToken),
          ]);
          
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        await Promise.all([
          AsyncStorage.removeItem(ACCESS_TOKEN),
          AsyncStorage.removeItem(REFRESH_TOKEN),
        ]);
        return Promise.reject(refreshError);
      }
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      // Don't log error for shopkeeper approval status - this is expected behavior
      if (!isExpectedShopkeeperApprovalError(error)) {
        console.error('Access forbidden:', error.response.data);
      }
      // Show permission error or redirect
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
      // Show network error message
    }
    
    // Handle timeout
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      // Show timeout error message
    }

    if (!isExpectedShopkeeperApprovalError(error)) {
      apiLogger.error(error);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
