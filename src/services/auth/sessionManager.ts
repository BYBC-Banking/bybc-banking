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

let activityTrackingEnabled = false;
let activityTimeout: number | undefined;

const activityEvents = ['click', 'keypress', 'mousemove', 'touchstart'];

function refreshSessionOnActivity() {
  if (!authState.user) return;

  authState.expiresAt = Date.now() + SESSION_TIMEOUT;
  persistAuthState();
  setupSessionTimeout();
}

// Detach activity listeners
export const removeActivityTracking = (): void => {
  activityEvents.forEach(event =>
    window.removeEventListener(event, refreshSessionOnActivity)
  );
  activityTrackingEnabled = false;
};

// Attach activity listeners
export const setupActivityTracking = (): void => {
  if (activityTrackingEnabled) return;
  activityEvents.forEach(event =>
    window.addEventListener(event, refreshSessionOnActivity)
  );
  activityTrackingEnabled = true;
};

// Timeout setup: logs out only *after* inactivity
export const setupSessionTimeout = (): void => {
  // Clear existing timeout if present
  if (window._sessionTimeoutId) {
    window.clearTimeout(window._sessionTimeoutId);
    window._sessionTimeoutId = undefined;
  }

  if (authState.expiresAt) {
    const timeRemaining = authState.expiresAt - Date.now();

    if (timeRemaining > 0) {
      // Set a new timeout for session expiry
      window._sessionTimeoutId = window.setTimeout(() => {
        // Only log out if user is still inactive (expiresAt not extended)
        if (authState.expiresAt && authState.expiresAt <= Date.now()) {
          logout("Your session has expired due to inactivity. Please login again.");
          removeActivityTracking();
        }
      }, timeRemaining);
    } else {
      // Already expired
      logout("Your session has expired due to inactivity. Please login again.");
      removeActivityTracking();
    }
  }
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

// Export for testing and debugging
export const _getAuthState = (): AuthState => {
  return { ...authState };
};

// When setting auth, always start tracking activity & session timeout.
export const setAuthState = (newState: AuthState): void => {
  authState = newState;
  if (newState.user) {
    setupActivityTracking();
    setupSessionTimeout();
  } else {
    removeActivityTracking();
    if (window._sessionTimeoutId) {
      window.clearTimeout(window._sessionTimeoutId);
      window._sessionTimeoutId = undefined;
    }
  }
};
