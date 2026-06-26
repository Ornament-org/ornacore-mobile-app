/**
 * Format weight in grams
 * @param {number} weight - Weight in grams
 * @param {number} decimals - Number of decimal places (default: 3)
 * @returns {string} Formatted weight string
 */
export const formatWeight = (weight, decimals = 3) => {
  if (weight === null || weight === undefined) {
    return '0g';
  }

  const formattedWeight = Number(weight).toFixed(decimals);
  return `${formattedWeight}g`;
};

/**
 * Format weight in kilograms
 * @param {number} weight - Weight in grams
 * @param {number} decimals - Number of decimal places (default: 3)
 * @returns {string} Formatted weight string in kg
 */
export const formatWeightInKg = (weight, decimals = 3) => {
  if (weight === null || weight === undefined) {
    return '0kg';
  }

  const weightInKg = weight / 1000;
  const formattedWeight = Number(weightInKg).toFixed(decimals);
  return `${formattedWeight}kg`;
};

/**
 * Format weight with unit (g or kg based on value)
 * @param {number} weight - Weight in grams
 * @returns {string} Formatted weight with appropriate unit
 */
export const formatWeightAuto = (weight) => {
  if (weight === null || weight === undefined) {
    return '0g';
  }

  if (weight >= 1000) {
    return formatWeightInKg(weight, 2);
  }

  return formatWeight(weight, 2);
};
