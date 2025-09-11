
// Security utilities for input validation and sanitization

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone format (South African only)
export const isValidPhone = (phone: string): boolean => {
  // Remove all spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // South African phone number patterns:
  // +27 followed by 9 digits (mobile: +27 6x, 7x, 8x, 1x, 2x, 3x, 4x, 5x)
  // 0 followed by 9 digits (mobile: 06x, 07x, 08x, 01x, 02x, 03x, 04x, 05x)
  const saPhoneRegex = /^(\+27|0)[0-9]{9}$/;
  
  // Additional validation for mobile numbers (most common in SA)
  const saMobileRegex = /^(\+27|0)[6-8][0-9]{8}$/;
  
  // Check if it matches SA format and is a valid mobile number
  return saPhoneRegex.test(cleanPhone) && saMobileRegex.test(cleanPhone);
};

// Validate password strength
export const isStrongPassword = (password: string): boolean => {
  // Strong password requirements: 8+ chars, uppercase, lowercase, number, special char
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

// Get password strength score (0-5)
export const getPasswordStrength = (password: string): { score: number; feedback: string[] } => {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length >= 8) score++; else feedback.push("At least 8 characters");
  if (/[A-Z]/.test(password)) score++; else feedback.push("Include uppercase letters");
  if (/[a-z]/.test(password)) score++; else feedback.push("Include lowercase letters");
  if (/\d/.test(password)) score++; else feedback.push("Include numbers");
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++; else feedback.push("Include special characters");
  
  return { score, feedback };
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

// CSRF Token Management - Enhanced cryptographically secure generation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  // Add timestamp and random salt for additional entropy
  const timestamp = Date.now().toString(36);
  const salt = Math.random().toString(36).substring(2);
  const baseToken = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  return `${baseToken}-${timestamp}-${salt}`;
};

// Store CSRF token in sessionStorage
export const storeCSRFToken = (token: string): void => {
  sessionStorage.setItem('csrf_token', token);
};

// Get stored CSRF token
export const getCSRFToken = (): string | null => {
  return sessionStorage.getItem('csrf_token');
};

// Generate and store a new CSRF token
export const initializeCSRFToken = (): string => {
  const token = generateCSRFToken();
  storeCSRFToken(token);
  return token;
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

// Format South African phone number for display
export const formatSAPhoneNumber = (phone: string): string => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  if (cleanPhone.startsWith('+27')) {
    const number = cleanPhone.substring(3);
    return `+27 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5)}`;
  } else if (cleanPhone.startsWith('0')) {
    return `${cleanPhone.substring(0, 3)} ${cleanPhone.substring(3, 6)} ${cleanPhone.substring(6)}`;
  }
  
  return phone;
};
