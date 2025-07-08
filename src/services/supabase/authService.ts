
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SupabaseUser {
  id: string;
  email: string;
  full_name: string;
  mobile?: string;
  role: string;
}

export interface AuthState {
  user: SupabaseUser | null;
  session: any;
  loading: boolean;
}

// Register a new user with Supabase
export const registerUser = async (userData: {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.fullName,
          mobile: userData.mobile,
          role: 'user'
        },
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }

    if (data.user && !data.user.email_confirmed_at) {
      toast.info("Please check your email to confirm your account");
    }

    return { success: true };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
};

// Login user with Supabase
export const loginUser = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Get current user profile
export const getCurrentUserProfile = async (): Promise<SupabaseUser | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Profile fetch error:', error);
      return null;
    }

    return {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      mobile: profile.mobile,
      role: profile.role
    };
  } catch (error) {
    console.error('Get user profile error:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  } catch {
    return false;
  }
};
