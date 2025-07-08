
import { logoutUser } from "@/services/supabase/authService";

// Simple logout function for utility usage
export const logout = async () => {
  await logoutUser();
};

// Re-export other auth utilities if needed
export * from "@/services/supabase/authService";
