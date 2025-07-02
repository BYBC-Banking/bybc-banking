
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Accounts from "@/pages/Accounts";
import Investments from "@/pages/Investments";
import Education from "@/pages/Education";

const BusinessRoutes = () => {
  return (
    <>
      <Route path="/accounts-business" element={
        <ProtectedRoute>
          <Accounts />
        </ProtectedRoute>
      } />
      <Route path="/investments-business" element={
        <ProtectedRoute>
          <Investments />
        </ProtectedRoute>
      } />
      <Route path="/education-business" element={
        <ProtectedRoute>
          <Education />
        </ProtectedRoute>
      } />
    </>
  );
};

export default BusinessRoutes;
