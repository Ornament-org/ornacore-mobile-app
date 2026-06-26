import appConfig from '../config/appConfig';
import { formatWeight } from './formatWeight';

/**
 * Format currency amount
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: INR)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = appConfig.CURRENCY) => {
  if (amount === null || amount === undefined) {
    return `${appConfig.CURRENCY_SYMBOL}0`;
  }

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
};

/**
 * Format price per piece
 * @param {number} price - Price per piece
 * @returns {string} Formatted price string
 */
export const formatPricePerPiece = (price) => {
  return `${formatCurrency(price)}/pc`;
};

/**
 * Format price with weight
 * @param {number} price - Total price
 * @param {number} weight - Weight in grams
 * @returns {string} Formatted price with weight
 */
export const formatPriceWithWeight = (price, weight) => {
  return `${formatCurrency(price)} (${formatWeight(weight)})`;
};
