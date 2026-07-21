import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateTokens from "../utils/generateToken.js";
import { cookieOptions } from "../utils/cookieOptions.js";

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    const user = await User.findOne({ email }).select(
        "+password +refreshToken"
    );

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

    const { accessToken, refreshToken } = await generateTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -verificationOtp -verificationOtpExpiresAt -resetPasswordOtp -resetPasswordOtpExpiresAt"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(200, "Login successful.", loggedInUser)
        );
});

export default login;