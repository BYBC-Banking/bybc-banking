import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { logoutUser } from '@/services/supabase/authService';

interface SessionTimeoutConfig {
  warningTime: number; // Time in minutes before session expires to show warning
  sessionTimeout: number; // Total session timeout in minutes
}

const DEFAULT_CONFIG: SessionTimeoutConfig = {
  warningTime: 5, // Warn 5 minutes before timeout
  sessionTimeout: 30 // 30 minute session timeout
};

export const useSessionTimeout = (config: SessionTimeoutConfig = DEFAULT_CONFIG) => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
      toast({
        title: "Session Expired",
        description: "Your session has expired. Please log in again.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Auto-logout failed:', error);
    }
  }, [toast]);

  const extendSession = useCallback(() => {
    setShowWarning(false);
    setTimeLeft(0);
    toast({
      title: "Session Extended",
      description: "Your session has been extended."
    });
  }, [toast]);

  useEffect(() => {
    if (!user || !session) {
      setShowWarning(false);
      setTimeLeft(0);
      return;
    }

    // Use the session's actual expiry time from Supabase
    const expiryTime = new Date(session.expires_at * 1000).getTime();
    const now = Date.now();
    const timeUntilExpire = (expiryTime - now) / (1000 * 60); // Time left in minutes
    
    if (timeUntilExpire <= 0) {
      // Session already expired
      logout();
      return;
    }

    if (timeUntilExpire <= config.warningTime && !showWarning) {
      // Show warning
      setShowWarning(true);
      setTimeLeft(Math.ceil(timeUntilExpire));
    }

    // Set up timer to check session status
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const currentExpiryTime = new Date(session.expires_at * 1000).getTime();
      const currentTimeLeft = (currentExpiryTime - currentTime) / (1000 * 60);

      if (currentTimeLeft <= 0) {
        logout();
      } else if (currentTimeLeft <= config.warningTime) {
        setShowWarning(true);
        setTimeLeft(Math.ceil(currentTimeLeft));
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [user, session, config, logout, showWarning]);

  return {
    showWarning,
    timeLeft,
    extendSession,
    logout
  };
};