import { useAuth } from '@/contexts/AuthContext';
import { useSessionTimeout } from './useSessionTimeout';
import { generateCSRFToken, storeCSRFToken, getCSRFToken } from '@/utils/security';
import { sanitizeError, secureErrorLog } from '@/utils/errorBoundary';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

/**
 * Enhanced authentication hook with comprehensive security features
 */
export const useSecureAuth = () => {
  const auth = useAuth();
  const sessionTimeout = useSessionTimeout();
  const { toast } = useToast();

  // Generate and store CSRF token on auth state changes
  useEffect(() => {
    if (auth.user && !getCSRFToken()) {
      const token = generateCSRFToken();
      storeCSRFToken(token);
    }
  }, [auth.user]);

  /**
   * Secure wrapper for authentication operations
   */
  const secureAuthAction = async <T>(
    action: () => Promise<T>,
    actionName: string
  ): Promise<T | null> => {
    try {
      const result = await action();
      return result;
    } catch (error) {
      const secureError = sanitizeError(error);
      secureErrorLog(secureError, `Auth Action: ${actionName}`);
      
      toast({
        title: "Authentication Error",
        description: secureError.userMessage,
        variant: "destructive"
      });
      
      return null;
    }
  };

  /**
   * Check if current session is secure and valid
   */
  const isSecureSession = (): boolean => {
    if (!auth.session || !auth.user) return false;
    
    // Check if session expires soon (use expires_at from session)
    if (auth.session.expires_at) {
      const expiryTime = new Date(auth.session.expires_at * 1000).getTime();
      const timeUntilExpiry = expiryTime - Date.now();
      const minValidTime = 5 * 60 * 1000; // Must have at least 5 minutes left
      
      if (timeUntilExpiry < minValidTime) {
        return false;
      }
    }
    
    // Check if CSRF token exists
    return !!getCSRFToken();
  };

  /**
   * Get secure headers for API requests
   */
  const getSecureHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {};
    
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }
    
    if (auth.session?.access_token) {
      headers['Authorization'] = `Bearer ${auth.session.access_token}`;
    }
    
    return headers;
  };

  return {
    ...auth,
    ...sessionTimeout,
    secureAuthAction,
    isSecureSession,
    getSecureHeaders
  };
};