
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "@/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  
  // If not logged in and not on login or register page, redirect to login
  if (!isLoggedIn() && 
      location.pathname !== '/login' && 
      location.pathname !== '/register') {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
