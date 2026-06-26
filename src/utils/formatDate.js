import appConfig from '../config/appConfig';

/**
 * Format date to display format
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type (default: DISPLAY)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'DISPLAY') => {
  if (!date) return '-';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '-';

  const formatType = appConfig.DATE_FORMATS[format] || appConfig.DATE_FORMATS.DISPLAY;

  switch (formatType) {
    case 'DD MMM YYYY':
      return dateObj.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    case 'DD MMM YYYY, HH:mm':
      return dateObj.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    case 'YYYY-MM-DD':
      return dateObj.toISOString().split('T')[0];
    case 'YYYY-MM-DD HH:mm:ss':
      return dateObj.toISOString().replace('T', ' ').split('.')[0];
    default:
      return dateObj.toLocaleDateString('en-IN');
  }
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }

  return formatDate(date);
};

/**
 * Check if date is today
 * @param {string|Date} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  if (!date) return false;

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};
