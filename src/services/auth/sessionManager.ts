
import { toast } from "sonner";
import { AuthState, SESSION_TIMEOUT } from "./types";

// Initialize auth state
let authState: AuthState = {
  user: null,
  token: null,
  expiresAt: null
};

// Save auth state to sessionStorage
export const persistAuthState = (): void => {
  try {
    sessionStorage.setItem('auth', JSON.stringify(authState));
  } catch (error) {
    console.error("Error saving auth state:", error);
  }
};

// Clear auth state
export const clearAuthState = (): void => {
  authState = {
    user: null,
    token: null,
    expiresAt: null
  };
  
  try {
    sessionStorage.removeItem('auth');
    localStorage.removeItem('isLoggedIn'); // Remove old storage format
  } catch (error) {
    console.error("Error clearing auth state:", error);
  }
  
  // Clear session timeout
  if (window._sessionTimeoutId) {
    window.clearTimeout(window._sessionTimeoutId);
    window._sessionTimeoutId = undefined;
  }
};

// Setup session timeout
export const setupSessionTimeout = (): void => {
  if (authState.expiresAt) {
    const timeRemaining = authState.expiresAt - Date.now();
    
    if (timeRemaining > 0) {
      // Clear any existing timeout
      if (window._sessionTimeoutId) {
        window.clearTimeout(window._sessionTimeoutId);
      }
      
      // Set new timeout
      window._sessionTimeoutId = window.setTimeout(() => {
        logout("Your session has expired. Please login again.");
      }, timeRemaining);
    } else {
      logout("Your session has expired. Please login again.");
    }
  }
};

// Activity tracking to refresh session
export const setupActivityTracking = (): void => {
  const refreshSession = () => {
    if (authState.user) {
      authState.expiresAt = Date.now() + SESSION_TIMEOUT;
      persistAuthState();
      setupSessionTimeout();
    }
  };
  
  // Attach event listeners
  window.addEventListener('click', refreshSession);
  window.addEventListener('keypress', refreshSession);
};

// Check for existing session in sessionStorage
export const initializeAuthState = (): void => {
  try {
    const storedAuth = sessionStorage.getItem('auth');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      
      // Validate token expiration
      if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
        authState = parsed;
        // Refresh the session timeout
        setupSessionTimeout();
      } else {
        // Session expired
        clearAuthState();
      }
    }
  } catch (error) {
    console.error("Error restoring auth state:", error);
    clearAuthState();
  }
};

// Logout function
export const logout = (message?: string): void => {
  clearAuthState();
  
  if (message) {
    toast.info(message);
  }
  
  // Redirect to login page
  window.location.href = "/login";
};

// Get auth state (for internal use)
export const getAuthState = (): AuthState => {
  return authState;
};

// Set auth state (for internal use)
export const setAuthState = (newState: AuthState): void => {
  authState = newState;
};

// Export for testing and debugging
export const _getAuthState = (): AuthState => {
  return { ...authState };
};
