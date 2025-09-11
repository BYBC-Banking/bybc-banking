
// Secure auth service - Supabase only
import { supabase } from "@/integrations/supabase/client";
import { 
  loginUser as supabaseLogin, 
  logoutUser as supabaseLogout, 
  getCurrentUserProfile, 
  isAuthenticated 
} from "./supabase/authService";

// Export secure auth functions
export const login = supabaseLogin;
export const logout = supabaseLogout;
export const getCurrentUser = getCurrentUserProfile;
export const isLoggedIn = isAuthenticated;

// Legacy compatibility exports (deprecated - use Supabase directly)
export const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
};

export const _getAuthState = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const user = await getCurrentUserProfile();
  return {
    user,
    session,
    token: session?.access_token || null
  };
};
