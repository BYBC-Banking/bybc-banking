/**
 * Enhanced error handling utilities to prevent information disclosure
 */

export interface SecureError {
  message: string;
  code?: string;
  timestamp: number;
  userMessage: string;
}

/**
 * Sanitize error messages to prevent information disclosure
 */
export const sanitizeError = (error: Error | string | unknown): SecureError => {
  const timestamp = Date.now();
  
  // Handle different error types
  if (error instanceof Error) {
    const message = error.message;
    
    // Check for sensitive information patterns
    const sensitivePatterns = [
      /password/i,
      /token/i,
      /secret/i,
      /key/i,
      /database/i,
      /internal/i,
      /stack trace/i,
      /file path/i
    ];
    
    const isSensitive = sensitivePatterns.some(pattern => pattern.test(message));
    
    if (isSensitive) {
      return {
        message: `Sanitized error: ${timestamp}`,
        userMessage: "An unexpected error occurred. Please try again or contact support if the issue persists.",
        timestamp
      };
    }
    
    // Return sanitized version of safe errors
    return {
      message: message.slice(0, 200), // Limit length
      userMessage: getUIFriendlyMessage(message),
      timestamp
    };
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return {
      message: error.slice(0, 200),
      userMessage: getUIFriendlyMessage(error),
      timestamp
    };
  }
  
  // Handle unknown error types
  return {
    message: `Unknown error type: ${timestamp}`,
    userMessage: "An unexpected error occurred. Please try again.",
    timestamp
  };
};

/**
 * Convert technical errors to user-friendly messages
 */
const getUIFriendlyMessage = (message: string): string => {
  const errorMappings: Record<string, string> = {
    'network': 'Network connection failed. Please check your internet connection.',
    'timeout': 'Request timed out. Please try again.',
    'unauthorized': 'Please log in to continue.',
    'forbidden': 'You do not have permission to perform this action.',
    'not found': 'The requested resource was not found.',
    'validation': 'Please check your input and try again.',
    'rate limit': 'Too many requests. Please wait a moment and try again.',
    'server error': 'Server error. Please try again later.',
    'invalid credentials': 'Invalid email or password. Please try again.',
    'email already exists': 'An account with this email already exists.',
    'weak password': 'Please choose a stronger password.'
  };
  
  const lowerMessage = message.toLowerCase();
  
  for (const [key, friendlyMessage] of Object.entries(errorMappings)) {
    if (lowerMessage.includes(key)) {
      return friendlyMessage;
    }
  }
  
  // Default fallback
  return 'An error occurred. Please try again.';
};

/**
 * Log errors securely (avoiding sensitive data in logs)
 */
export const secureErrorLog = (error: SecureError, context?: string) => {
  // In production, this would integrate with your logging service
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context || 'Error'}] ${error.message}`, {
      timestamp: new Date(error.timestamp).toISOString(),
      code: error.code
    });
  }
  
  // In production, send to secure logging service
  // logToSecureService(error, context);
};