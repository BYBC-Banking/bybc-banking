
import { User } from "./types";
import { getAuthState } from "./sessionManager";

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  const authState = getAuthState();
  return !!authState.user && !!authState.token && !!authState.expiresAt && authState.expiresAt > Date.now();
};

// Get current user
export const getCurrentUser = (): User | null => {
  const authState = getAuthState();
  return authState.user;
};

// Get auth token
export const getAuthToken = (): string | null => {
  const authState = getAuthState();
  return authState.token;
};
