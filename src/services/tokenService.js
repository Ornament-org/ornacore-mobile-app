import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const tokenService = {
  // Store access token
  setAccessToken: async (token) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
    } catch (error) {
      console.error('Error storing access token:', error);
      throw error;
    }
  },

  // Store refresh token
  setRefreshToken: async (token) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, token);
    } catch (error) {
      console.error('Error storing refresh token:', error);
      throw error;
    }
  },

  // Store both tokens
  setTokens: async (accessToken, refreshToken) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken),
        AsyncStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken),
      ]);
    } catch (error) {
      console.error('Error storing tokens:', error);
      throw error;
    }
  },

  // Get access token
  getAccessToken: async () => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },

  // Get refresh token
  getRefreshToken: async () => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  },

  // Clear all tokens
  clearTokens: async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN),
        AsyncStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN),
      ]);
    } catch (error) {
      console.error('Error clearing tokens:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },
};
