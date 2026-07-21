import { Router } from "express";

import {
    register,
    verifyEmail,
    resendVerificationOtp,
    login,
    logout,
    refreshAccessToken,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    getCurrentUser,
    changePassword,
    deleteAccount,
} from "../controllers/auth.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// Authentication
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification-otp", resendVerificationOtp);

router.post("/login", login);
router.post("/logout", authenticate, logout);
router.post("/refresh-token", refreshAccessToken);

// Password Recovery
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

// User
router.get("/me", authenticate, getCurrentUser);
router.patch("/change-password", authenticate, changePassword);
router.delete("/delete-account", authenticate, deleteAccount);

export default router;