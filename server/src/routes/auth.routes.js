import { Router } from "express";

import changePassword from "../controllers/changePassword.controller.js";
import deleteAccount from "../controllers/deleteAccount.controller.js";
import forgotPassword from "../controllers/forgotPassword.controller.js";
import getCurrentUser from "../controllers/getCurrentUser.controller.js";
import login from "../controllers/login.controller.js";
import logout from "../controllers/logout.controller.js";
import refreshAccessToken from "../controllers/refreshAccessToken.controller.js";
import register from "../controllers/register.controller.js";
import resendVerificationOtp from "../controllers/resendVerificationOtp.controller.js";
import resetPassword from "../controllers/resetPassword.controller.js";
import verifyEmail from "../controllers/verifyEmail.controller.js";
import verifyResetOtp from "../controllers/verifyResetOtp.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

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