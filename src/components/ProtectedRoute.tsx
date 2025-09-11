
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import LoadingScreen from './LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: "admin" | "user";
}

const ProtectedRoute = ({ children, requireAuth = true, requiredRole }: ProtectedRouteProps) => {
  const { user, loading, isSecureSession } = useSecureAuth();
  const location = useLocation();

  useEffect(() => {
    // Track route access attempts for security monitoring
    if (!loading && requireAuth && !user) {
      console.warn('Unauthorized route access attempt:', location.pathname);
    }
  }, [user, loading, requireAuth, location.pathname]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (requireAuth && !user) {
    // Redirect to login with return path
    const redirectPath = `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`;
    return <Navigate to={redirectPath} replace />;
  }

  if (requireAuth && user && !isSecureSession()) {
    // Session is invalid, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If role check is required and user doesn't have required role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to dashboard or unauthorized page
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
