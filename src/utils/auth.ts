
import { loginUser, logoutUser, isAuthenticated } from "@/services/supabase/authService";

// Simple login function for utility usage
export const login = async (email: string, password: string): Promise<boolean> => {
  const result = await loginUser(email, password);
  return result.success;
};

// Simple logout function for utility usage
export const logout = async () => {
  await logoutUser();
};

// Check if user is logged in
export const isLoggedIn = async (): Promise<boolean> => {
  return await isAuthenticated();
};

// Re-export other auth utilities if needed
export * from "@/services/supabase/authService";
