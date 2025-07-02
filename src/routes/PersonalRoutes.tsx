
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Accounts from "@/pages/Accounts";
import Investments from "@/pages/Investments";
import Education from "@/pages/Education";

const PersonalRoutes = () => {
  return (
    <>
      <Route path="/accounts-personal" element={
        <ProtectedRoute>
          <Accounts />
        </ProtectedRoute>
      } />
      <Route path="/investments-personal" element={
        <ProtectedRoute>
          <Investments />
        </ProtectedRoute>
      } />
      <Route path="/education-personal" element={
        <ProtectedRoute>
          <Education />
        </ProtectedRoute>
      } />
    </>
  );
};

export default PersonalRoutes;
