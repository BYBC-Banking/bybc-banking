
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedIn, getCurrentUser } from "@/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = isLoggedIn();
  const currentUser = getCurrentUser();
  
  // Check for authentication
  if (!isAuthenticated) {
    // Redirect to login with the intended destination
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  
  // If role check is required and user doesn't have required role
  if (requiredRole && currentUser && currentUser.role !== requiredRole) {
    // Redirect to dashboard or unauthorized page
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
