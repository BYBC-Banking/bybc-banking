
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SupabaseUser, getCurrentUserProfile } from '@/services/supabase/authService';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    if (session?.user) {
      const profile = await getCurrentUserProfile();
      setUser(profile);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setLoading(true);
        
        if (session?.user) {
          setTimeout(async () => {
            const profile = await getCurrentUserProfile();
            setUser(profile);
            setLoading(false);
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        getCurrentUserProfile().then(profile => {
          setUser(profile);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    session,
    loading,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
