import api from "../../services/axios";

const get = async (url) => (await api.get(url)).data;
const post = async (url, payload) => (await api.post(url, payload)).data;
const patch = async (url, payload) => (await api.patch(url, payload)).data;
const remove = async (url) => (await api.delete(url)).data;

export const registerUser = (payload) => post("/auth/register", payload);

export const verifyEmail = (payload) =>
  post("/auth/verify-email", payload);

export const resendVerificationOtp = (payload) =>
  post("/auth/resend-verification-otp", payload);

export const loginUser = (payload) => post("/auth/login", payload);

export const logoutUser = () => post("/auth/logout");

export const refreshToken = () => post("/auth/refresh-token");

export const getCurrentUser = () => get("/auth/me");

export const forgotPassword = (payload) =>
  post("/auth/forgot-password", payload);

export const verifyResetOtp = (payload) =>
  post("/auth/verify-reset-otp", payload);

export const resetPassword = (payload) =>
  post("/auth/reset-password", payload);

export const changePassword = (payload) =>
  patch("/auth/change-password", payload);

export const deleteAccount = () => remove("/auth/delete-account");