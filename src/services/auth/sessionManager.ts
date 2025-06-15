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

// --- Inactivity timer logic ---

let activityTrackingEnabled = false;
let inactivityTimeout: number | undefined;
const activityEvents = ['click', 'keypress', 'mousemove', 'touchstart'];

// Inactivity logic:
// 1. On user activity, reset inactivity timer.
// 2. If inactivity timer expires, log out.

function handleUserActivity() {
  // Only track inactivity if a user is logged in
  if (!authState.user) return;
  resetInactivityTimer();
}

function resetInactivityTimer() {
  // Clear existing
  if (window._sessionTimeoutId) {
    window.clearTimeout(window._sessionTimeoutId);
    window._sessionTimeoutId = undefined;
  }
  // Start new
  window._sessionTimeoutId = window.setTimeout(() => {
    logout("Your session has expired due to inactivity. Please login again.");
    removeActivityTracking();
  }, SESSION_TIMEOUT);
}

// Detach activity listeners
export const removeActivityTracking = (): void => {
  activityEvents.forEach(event =>
    window.removeEventListener(event, handleUserActivity)
  );
  activityTrackingEnabled = false;
  // Clear timer
  if (window._sessionTimeoutId) {
    window.clearTimeout(window._sessionTimeoutId);
    window._sessionTimeoutId = undefined;
  }
};

// Attach activity listeners & start inactivity tracking
export const setupActivityTracking = (): void => {
  if (activityTrackingEnabled) return;
  activityEvents.forEach(event =>
    window.addEventListener(event, handleUserActivity)
  );
  activityTrackingEnabled = true;
  // Start the timer right away (so if user "does nothing" after login, timer will count)
  resetInactivityTimer();
};

// Legacy export for API compatibility, no need to do anything here now.
export const setupSessionTimeout = (): void => {
  // No-op: session timeout handled by activity/inactivity.
};

// Check for existing session in sessionStorage
export const initializeAuthState = (): void => {
  try {
    const storedAuth = sessionStorage.getItem('auth');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      
      // Validate token expiration if present
      authState = parsed;
      if (authState.user && authState.token) {
        setupActivityTracking();
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
    // timer will be managed by activity tracking now
  } else {
    removeActivityTracking();
  }
};
