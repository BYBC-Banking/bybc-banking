
import { toast } from "sonner";

// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

interface AuthState {
  user: User | null;
  token: string | null;
  expiresAt: number | null;
}

// Session timeout in milliseconds (15 minutes)
const SESSION_TIMEOUT = 15 * 60 * 1000;

// Mock user database - in a real app, this would be on the backend
const USERS = [
  {
    id: "admin-123",
    email: "bybc.banking@gmail.com",
    password: "$2a$10$dj39dofjadkjfaldsjflasjdfljasdf", // This would be a proper hash in a real app
    name: "BYBC Admin",
    role: "admin" as const
  }
];

// Initialize auth state
let authState: AuthState = {
  user: null,
  token: null,
  expiresAt: null
};

// Check for existing session in sessionStorage
const initializeAuthState = (): void => {
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

// Setup session timeout
const setupSessionTimeout = (): void => {
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

// Save auth state to sessionStorage
const persistAuthState = (): void => {
  try {
    sessionStorage.setItem('auth', JSON.stringify(authState));
  } catch (error) {
    console.error("Error saving auth state:", error);
  }
};

// Clear auth state
const clearAuthState = (): void => {
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

// Login function
export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    // Validate inputs
    if (!email || !password) {
      toast.error("Email and password are required");
      return false;
    }
    
    // Sanitize inputs
    email = email.trim().toLowerCase();
    
    // In a real app, this would be an API call with proper password hashing
    // For now, we'll use a simple mock authentication
    
    // Find user by email (case insensitive)
    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // Basic security check - this would be replaced by proper password verification
    if (user && (password === "adminbybc" || password === user.password)) {
      // Generate a mock token - in a real app, this would be a JWT from the server
      const token = `mock-token-${Math.random().toString(36).substring(2)}`;
      const expiresAt = Date.now() + SESSION_TIMEOUT;
      
      // Update auth state
      authState = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token,
        expiresAt
      };
      
      // Persist auth state
      persistAuthState();
      
      // Setup session timeout
      setupSessionTimeout();
      
      // Attach event listeners for activity tracking
      setupActivityTracking();
      
      return true;
    }
    
    toast.error("Invalid email or password");
    return false;
  } catch (error) {
    console.error("Login error:", error);
    toast.error("An error occurred during login");
    return false;
  }
};

// Activity tracking to refresh session
const setupActivityTracking = (): void => {
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

// Logout function
export const logout = (message?: string): void => {
  clearAuthState();
  
  if (message) {
    toast.info(message);
  }
  
  // Redirect to login page
  window.location.href = "/login";
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!authState.user && !!authState.token && !!authState.expiresAt && authState.expiresAt > Date.now();
};

// Get current user
export const getCurrentUser = (): User | null => {
  return authState.user;
};

// Get auth token
export const getAuthToken = (): string | null => {
  return authState.token;
};

// Initialize auth on load
initializeAuthState();

// Extend Window interface to allow for session timeout ID
declare global {
  interface Window {
    _sessionTimeoutId?: number;
  }
}

// Export for testing and debugging
export const _getAuthState = (): AuthState => {
  return { ...authState };
};
