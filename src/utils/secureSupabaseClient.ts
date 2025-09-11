import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { applySecurityHeaders } from './securityHeaders';

const SUPABASE_URL = "https://tctderzpbrbtatprpmna.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjdGRlcnpwYnJidGF0cHJwbW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMDAzMDMsImV4cCI6MjA2NzU3NjMwM30.azTg_bOs-E9WShGFBtiRFWV8wGekXMXq83BzASh-rVI";

// Enhanced Supabase client with security configurations
export const secureSupabaseClient = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // Use PKCE for enhanced security
  },
  global: {
    headers: applySecurityHeaders(),
    fetch: async (url, options = {}) => {
      // Add security headers to all requests
      const existingHeaders = (options as any)?.headers || {};
      const secureOptions = {
        ...options,
        headers: applySecurityHeaders(existingHeaders)
      };
      
      // Use native fetch with enhanced security
      return fetch(url, secureOptions);
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10 // Limit realtime events for security
    }
  }
});

// Export both for compatibility
export { secureSupabaseClient as supabase };