
// Main auth service - orchestrates all auth functionality
import { authenticateUser } from "./auth/userValidation";
import { logout, initializeAuthState, _getAuthState } from "./auth/sessionManager";
import { isLoggedIn, getCurrentUser, getAuthToken } from "./auth/userManager";

// Export main auth functions
export { isLoggedIn, getCurrentUser, getAuthToken, logout, _getAuthState };

// Export types for external use
export type { User } from "./auth/types";

// Login function (wrapper around authenticateUser)
export const login = authenticateUser;

// Initialize auth on load
initializeAuthState();
