const SENSITIVE_KEYS = new Set([
  'authorization',
  'accessToken',
  'refreshToken',
  'access_token',
  'refresh_token',
  'password',
  'confirmPassword',
  'oldPassword',
  'newPassword',
]);

const isDev = typeof __DEV__ !== 'undefined' && __DEV__;

const redactValue = (key, value) => {
  if (SENSITIVE_KEYS.has(String(key))) return '[REDACTED]';
  if (Array.isArray(value)) return value.map((item) => redactSensitiveData(item));
  if (value && typeof value === 'object') return redactSensitiveData(value);
  return value;
};

export const redactSensitiveData = (data) => {
  if (!data || typeof data !== 'object') return data;
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, redactValue(key, value)]),
  );
};

const getFullUrl = (config = {}) => {
  const baseURL = config.baseURL ?? '';
  const url = config.url ?? '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${baseURL}${url}`;
};

export const apiLogger = {
  request(config) {
    if (!isDev) return;

    const method = String(config.method ?? 'GET').toUpperCase();
    console.groupCollapsed(`[API] ${method} ${getFullUrl(config)}`);
    console.log('params', redactSensitiveData(config.params));
    console.log('body', redactSensitiveData(config.data));
    console.groupEnd();
  },

  response(response) {
    if (!isDev) return;

    const method = String(response.config?.method ?? 'GET').toUpperCase();
    const startedAt = response.config?.metadata?.startedAt;
    const duration = startedAt ? `${Date.now() - startedAt}ms` : 'n/a';

    console.groupCollapsed(
      `[API] ${response.status} ${method} ${getFullUrl(response.config)} (${duration})`,
    );
    console.log('response', redactSensitiveData(response.data));
    console.groupEnd();
  },

  error(error) {
    if (!isDev) return;

    const config = error.config ?? {};
    const method = String(config.method ?? 'GET').toUpperCase();
    const status = error.response?.status ?? 'NETWORK';
    const startedAt = config.metadata?.startedAt;
    const duration = startedAt ? `${Date.now() - startedAt}ms` : 'n/a';

    console.groupCollapsed(`[API] ${status} ${method} ${getFullUrl(config)} (${duration})`);
    console.log('params', redactSensitiveData(config.params));
    console.log('body', redactSensitiveData(config.data));
    console.log('error', redactSensitiveData(error.response?.data ?? { message: error.message }));
    console.groupEnd();
  },
};
