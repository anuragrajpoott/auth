import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import Dashboard from "../../pages/Dashboard";
import ForgotPassword from "../../pages/ForgotPassword";
import Login from "../../pages/Login";
import NotFound from "../../pages/NotFound";
import Profile from "../../pages/Profile";
import Register from "../../pages/Register";
import ResetPassword from "../../pages/ResetPassword";
import VerifyEmail from "../../pages/VerifyEmail";
import VerifyResetOtp from "../../pages/VerifyResetOtp";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;