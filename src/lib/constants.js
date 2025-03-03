/**
 * Shared constants used across payment components
 */

// Payment method types
export const PAYMENT_METHODS = {
  BANK_TRANSFER: 'bank-transfer',
  CREDIT_CARD: 'card',
  PAYPAL: 'paypal'
};

// Country codes
export const COUNTRIES = {
  UK: 'UK',
  EU: 'EU',
  US: 'US'
};

// Currency options with symbols
export const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD ($)', symbol: '$' },
  { value: 'EUR', label: 'EUR (€)', symbol: '€' },
  { value: 'GBP', label: 'GBP (£)', symbol: '£' },
  { value: 'JPY', label: 'JPY (¥)', symbol: '¥' }
];

// Get currency symbol from currency code
export const getCurrencySymbol = (currencyCode) => {
  const currency = CURRENCY_OPTIONS.find(c => c.value === currencyCode);
  return currency ? currency.symbol : '';
};