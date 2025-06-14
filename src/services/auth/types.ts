
// Auth types and interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
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
}

// Constants
export const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

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

// Extend Window interface to allow for session timeout ID
declare global {
  interface Window {
    _sessionTimeoutId?: number;
  }
}
