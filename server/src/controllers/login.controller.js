import User from "../models/User.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import generateTokens from "../utils/generateTokens.js";

import cookieOptions from "../config/cookieOptions.js";

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
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

export default login;