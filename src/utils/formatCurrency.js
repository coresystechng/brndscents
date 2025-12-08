// utils/formatCurrency.js

/**
 * Formats a number as Nigerian Naira (NGN).
 * @param {number} amount
 * @returns {string} Formatted currency string
 */
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

export default formatCurrency;