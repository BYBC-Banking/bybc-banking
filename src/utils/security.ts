
// Security utilities for input validation and sanitization

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone format (South African)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+27|0)[0-9]{9}$/;
  return phoneRegex.test(phone);
};

// Validate password strength
export const isStrongPassword = (password: string): boolean => {
  return password.length >= 8;
};

// Sanitize text input to prevent XSS
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  // Replace potentially dangerous characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Validate numeric input
export const isValidNumber = (value: string): boolean => {
  return !isNaN(Number(value));
};

// Validate currency amount
export const isValidCurrencyAmount = (amount: string): boolean => {
  const currencyRegex = /^\d+(\.\d{1,2})?$/;
  return currencyRegex.test(amount);
};

// Generate a CSRF token (this would be more robust in a real application)
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Store CSRF token in sessionStorage
export const storeCSRFToken = (token: string): void => {
  sessionStorage.setItem('csrf_token', token);
};

// Get stored CSRF token
export const getCSRFToken = (): string | null => {
  return sessionStorage.getItem('csrf_token');
};

// Validate a transaction to prevent tampering
export const validateTransaction = (transaction: any, expectedAmount?: number): boolean => {
  // Basic validation
  if (!transaction || typeof transaction !== 'object') return false;
  
  // Ensure required fields
  if (!transaction.id || !transaction.amount || !transaction.recipient) return false;
  
  // Validate amount if expected amount is provided
  if (expectedAmount !== undefined && transaction.amount !== expectedAmount) return false;
  
  return true;
};
