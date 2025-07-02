
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AccountRecovery from "@/pages/AccountRecovery";

const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account-recovery" element={<AccountRecovery />} />
    </>
  );
};

export default AuthRoutes;
