import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { parseWebsiteParams, generateWebsiteRedirectUrl } from '@/utils/websiteIntegration';
import { useToast } from '@/hooks/use-toast';

interface WebsiteRedirectHandlerProps {
  children: React.ReactNode;
}

const WebsiteRedirectHandler = ({ children }: WebsiteRedirectHandlerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Only process if not loading and we have URL parameters
    if (loading || !location.search) return;

    const params = parseWebsiteParams();
    
    // Check if this is a redirect from the main website
    if (params.source === 'website') {
      if (user) {
        // User is already logged in, redirect back to website
        handleSuccessfulAuth();
      } else {
        // User needs to authenticate, redirect to appropriate page
        handleAuthRedirect(params);
      }
    }
  }, [user, loading, location.search]);

  const handleSuccessfulAuth = () => {
    const params = parseWebsiteParams();
    
    if (params.returnUrl) {
      // Generate redirect URL with success parameters
      const redirectUrl = generateWebsiteRedirectUrl({
        success: true,
        returnUrl: params.returnUrl,
        userId: user?.id,
        token: undefined // Use Supabase session management instead
      });

      toast({
        title: "Authentication Successful",
        description: "Redirecting you back to the main website..."
      });

      // Redirect after a short delay to show the toast
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2000);
    }
  };

  const handleAuthRedirect = (params: ReturnType<typeof parseWebsiteParams>) => {
    const { action, accountType } = params;
    
    if (action === 'register') {
      // Pre-select account type if provided
      const registerUrl = accountType 
        ? `/register?account_type=${accountType}` 
        : '/register';
      navigate(registerUrl);
    } else {
      // Default to login
      navigate('/login');
    }
  };

  return <>{children}</>;
};

export default WebsiteRedirectHandler;