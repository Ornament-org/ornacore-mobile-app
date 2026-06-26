import { Platform } from 'react-native';

const developmentApiBaseUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2:4000/api/v1' : 'http://localhost:4000/api/v1';

// Environment configuration
const ENV = {
  development: {
    API_BASE_URL: developmentApiBaseUrl,
    APP_ENV: 'development',
    APP_NAME: 'OrnaCore',
    DEBUG: true,
    USE_CATALOG_FIXTURES: false,
  },
  production: {
    API_BASE_URL: 'https://api.ornacore.com/api/v1',
    APP_ENV: 'production',
    APP_NAME: 'OrnaCore',
    DEBUG: false,
    USE_CATALOG_FIXTURES: false,
  },
  staging: {
    API_BASE_URL: 'https://staging-api.ornacore.com/api/v1',
    APP_ENV: 'staging',
    APP_NAME: 'OrnaCore Staging',
    DEBUG: true,
    USE_CATALOG_FIXTURES: false,
  },
};

const getEnvVars = () => {
  const env = typeof __DEV__ !== 'undefined' && __DEV__ ? 'development' : 'production';
  return ENV[env];
};

export default getEnvVars();
