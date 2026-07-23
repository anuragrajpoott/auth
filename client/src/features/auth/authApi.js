import api from "../../services/axios";

export const registerUser = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const verifyEmail = async (payload) => {
  const response = await api.post("/auth/verify-email", payload);
  return response.data;
};

export const resendVerificationOtp = async (payload) => {
  const response = await api.post(
    "/auth/resend-verification-otp",
    payload
  );
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const forgotPassword = async (payload) => {
  const response = await api.post("/auth/forgot-password", payload);
  return response.data;
};

export const verifyResetOtp = async (payload) => {
  const response = await api.post("/auth/verify-reset-otp", payload);
  return response.data;
};

export const resetPassword = async (payload) => {
  const response = await api.post("/auth/reset-password", payload);
  return response.data;
};

export const changePassword = async (payload) => {
  const response = await api.patch(
    "/auth/change-password",
    payload
  );
  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete("/auth/delete-account");
  return response.data;
};