import jwt from "jsonwebtoken";

import User from "../models/User.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import generateTokens from "../utils/generateTokens.js";
import generateOtp from "../utils/generateOtp.js";
import hashOtp from "../utils/hashOtp.js";

import sendEmail from "../utils/sendEmail.js";
import emailTemplates from "../utils/emailTemplates.js";

import cookieOptions from "../config/cookieOptions.js";

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required.");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User already exists.");
    }

    const otp = generateOtp();

    const user = await User.create({
        name,
        email,
        password,
        verificationOtp: hashOtp(otp),
        verificationOtpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmail({
        to: user.email,
        ...emailTemplates.verifyEmail(user.name, otp),
    });

    return res
        .status(201)
        .json(new ApiResponse(201, null, "Registration successful. Please verify your email."));
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    if (user.isVerified) {
        throw new ApiError(400, "Email already verified.");
    }

    if (
        !user.verificationOtp ||
        !user.verificationOtpExpiry ||
        user.verificationOtpExpiry < new Date()
    ) {
        throw new ApiError(400, "OTP expired.");
    }

    if (user.verificationOtp !== hashOtp(otp)) {
        throw new ApiError(400, "Invalid OTP.");
    }

    user.isVerified = true;
    user.verificationOtp = undefined;
    user.verificationOtpExpiry = undefined;

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Email verified successfully."));
});

const resendVerificationOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    if (user.isVerified) {
        throw new ApiError(400, "Email already verified.");
    }

    const otp = generateOtp();

    user.verificationOtp = hashOtp(otp);
    user.verificationOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendEmail({
        to: user.email,
        ...emailTemplates.verifyEmail(user.name, otp),
    });

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Verification OTP sent successfully."));
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials.");
    }

    if (!user.isVerified) {
        throw new ApiError(403, "Please verify your email first.");
    }

    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshToken = refreshToken;
    await user.save();

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -verificationOtp -verificationOtpExpiry -resetPasswordOtp -resetPasswordOtpExpiry"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, loggedInUser, "Login successful."));
});

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1,
        },
    });

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, null, "Logout successful."));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required.");
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    } catch {
        throw new ApiError(401, "Invalid refresh token.");
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
        throw new ApiError(401, "Invalid refresh token.");
    }

    if (user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(401, "Refresh token mismatch.");
    }

    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshToken = refreshToken;
    await user.save();

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, null, "Access token refreshed."));
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const otp = generateOtp();

    user.resetPasswordOtp = hashOtp(otp);
    user.resetPasswordOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendEmail({
        to: user.email,
        ...emailTemplates.resetPassword(user.name, otp),
    });

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Password reset OTP sent."));
});

const verifyResetOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    if (
        !user.resetPasswordOtp ||
        !user.resetPasswordOtpExpiry ||
        user.resetPasswordOtpExpiry < new Date()
    ) {
        throw new ApiError(400, "OTP expired.");
    }

    if (user.resetPasswordOtp !== hashOtp(otp)) {
        throw new ApiError(400, "Invalid OTP.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, null, "OTP verified successfully."));
});

const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        throw new ApiError(400, "All fields are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    if (
        !user.resetPasswordOtp ||
        !user.resetPasswordOtpExpiry ||
        user.resetPasswordOtpExpiry < new Date()
    ) {
        throw new ApiError(400, "OTP expired.");
    }

    if (user.resetPasswordOtp !== hashOtp(otp)) {
        throw new ApiError(400, "Invalid OTP.");
    }

    user.password = newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpiry = undefined;
    user.refreshToken = undefined;

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Password reset successful."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "-password -refreshToken -verificationOtp -verificationOtpExpiry -resetPasswordOtp -resetPasswordOtpExpiry"
    );

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Current user fetched successfully."));
});

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        throw new ApiError(400, "Both passwords are required.");
    }

    const user = await User.findById(req.user._id);

    const isPasswordCorrect = await user.comparePassword(currentPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Current password is incorrect.");
    }

    user.password = newPassword;

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Password changed successfully."));
});

const deleteAccount = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.user._id);

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, null, "Account deleted successfully."));
});

export {
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
};