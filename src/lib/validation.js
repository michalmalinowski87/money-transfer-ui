/**
 * Form validation utilities for payment forms
 */

/**
 * Validates if a field is not empty
 * @param {string} value - Field value to validate
 * @returns {boolean} - Whether the field is valid
 */
export const isNotEmpty = (value) => {
  return value !== undefined && value !== null && value.trim() !== '';
};

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
  if (!isNotEmpty(email)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a UK sort code
 * @param {string} sortCode - Sort code to validate
 * @returns {boolean} - Whether the sort code is valid
 */
export const isValidSortCode = (sortCode) => {
  if (!isNotEmpty(sortCode)) return false;
  // Format: xx-xx-xx or xxxxxx
  const sortCodeRegex = /^(\d{2}-\d{2}-\d{2}|\d{6})$/;
  return sortCodeRegex.test(sortCode);
};

/**
 * Validates a UK account number
 * @param {string} accountNumber - Account number to validate
 * @returns {boolean} - Whether the account number is valid
 */
export const isValidAccountNumber = (accountNumber) => {
  if (!isNotEmpty(accountNumber)) return false;
  // 8 digit number
  const accountNumberRegex = /^\d{8}$/;
  return accountNumberRegex.test(accountNumber);
};

/**
 * Validates an IBAN
 * @param {string} iban - IBAN to validate
 * @returns {boolean} - Whether the IBAN is valid
 */
export const isValidIBAN = (iban) => {
  if (!isNotEmpty(iban)) return false;
  // Basic IBAN format check (this is simplified)
  const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
  return ibanRegex.test(iban.replace(/\s/g, ''));
};

/**
 * Validates a BIC/SWIFT code
 * @param {string} bicSwift - BIC/SWIFT to validate
 * @returns {boolean} - Whether the BIC/SWIFT is valid
 */
export const isValidBICSwift = (bicSwift) => {
  if (!isNotEmpty(bicSwift)) return false;
  // Basic BIC/SWIFT format check
  const bicSwiftRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
  return bicSwiftRegex.test(bicSwift.replace(/\s/g, ''));
};

/**
 * Validates a credit card number using Luhn algorithm
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} - Whether the card number is valid
 */
export const isValidCardNumber = (cardNumber) => {
  if (!isNotEmpty(cardNumber)) return false;
  
  // Remove spaces and dashes
  const sanitized = cardNumber.replace(/[\s-]/g, '');
  
  // Check if only digits
  if (!/^\d+$/.test(sanitized)) return false;
  
  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

/**
 * Validates a credit card expiry date
 * @param {string} expiryDate - Expiry date to validate (MM/YY)
 * @returns {boolean} - Whether the expiry date is valid
 */
export const isValidExpiryDate = (expiryDate) => {
  if (!isNotEmpty(expiryDate)) return false;
  
  // Format: MM/YY
  const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!expiryRegex.test(expiryDate)) return false;
  
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
  const currentMonth = currentDate.getMonth() + 1; // 1-12
  
  const expiryYear = parseInt(year);
  const expiryMonth = parseInt(month);
  
  // Check if card is not expired
  if (expiryYear < currentYear || 
      (expiryYear === currentYear && expiryMonth < currentMonth)) {
    return false;
  }
  
  return true;
};

/**
 * Validates a CVV
 * @param {string} cvv - CVV to validate
 * @returns {boolean} - Whether the CVV is valid
 */
export const isValidCVV = (cvv) => {
  if (!isNotEmpty(cvv)) return false;
  // 3 or 4 digits
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
};