
// Auth types and interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  mobile?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  expiresAt: number | null;
}

export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
  mobile?: string;
}

// Constants
export const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds
export const MAX_REGISTRATION_USERS = 100;

// Mock user database - in a real app, this would be on the backend
export const USERS: MockUser[] = [
  {
    id: "admin-123",
    email: "bybc.banking@gmail.com",
    password: "$2a$10$dj39dofjadkjfaldsjflasjdfljasdf", // This would be a proper hash in a real app
    name: "BYBC Admin",
    role: "admin" as const
  },
  {
    id: "admin-456",
    email: "bybc.banking@bybc.co.za",
    password: "Adminunlock",
    name: "BYBC Admin",
    role: "admin" as const
  }
];

// Storage keys
export const STORAGE_KEYS = {
  REGISTERED_USERS: 'bybc_registered_users',
  USER_COUNT: 'bybc_user_count'
} as const;

// Helper functions for user storage
export const getRegisteredUsers = (): MockUser[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading registered users:', error);
    return [];
  }
};

export const saveRegisteredUsers = (users: MockUser[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving registered users:', error);
  }
};

export const getUserCount = (): number => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_COUNT);
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.error('Error reading user count:', error);
    return 0;
  }
};

export const setUserCount = (count: number): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_COUNT, count.toString());
  } catch (error) {
    console.error('Error saving user count:', error);
  }
};

// Extend Window interface to allow for session timeout ID
declare global {
  interface Window {
    _sessionTimeoutId?: number;
  }
}
