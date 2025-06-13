
import { toast } from "sonner";
import { USERS, User, SESSION_TIMEOUT } from "./types";
import { setAuthState, persistAuthState, setupSessionTimeout, setupActivityTracking } from "./sessionManager";

// Login function
export const authenticateUser = async (email: string, password: string): Promise<boolean> => {
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
      const authState = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token,
        expiresAt
      };
      
      setAuthState(authState);
      
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
