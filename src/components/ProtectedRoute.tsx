
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }
  
  // Check for authentication
  if (!user) {
    // Redirect to login with the intended destination
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  
  // If role check is required and user doesn't have required role
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to dashboard or unauthorized page
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
