
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { isLoggedIn } from "@/utils/auth";
import AuthRoutes from "./AuthRoutes";
import PersonalRoutes from "./PersonalRoutes";
import BusinessRoutes from "./BusinessRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn() ? "/dashboard" : "/login"} replace />} />
      
      {/* Authentication routes */}
      <AuthRoutes />
      
      {/* Personal section routes */}
      <PersonalRoutes />
      
      {/* Business section routes */}
      <BusinessRoutes />
      
      {/* All other protected routes */}
      <ProtectedRoutes />
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
