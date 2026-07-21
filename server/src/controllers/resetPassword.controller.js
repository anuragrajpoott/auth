import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import hashOtp from "../utils/hashOtp.js";

const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        throw new ApiError(400, "All fields are required.");
    }

    const user = await User.findOne({ email }).select(
        "+resetPasswordOtp +resetPasswordOtpExpiresAt +refreshToken"
    );

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const isOtpExpired =
        !user.resetPasswordOtp ||
        !user.resetPasswordOtpExpiresAt ||
        user.resetPasswordOtpExpiresAt < new Date();

    if (isOtpExpired) {
        throw new ApiError(400, "OTP expired.");
    }

    if (user.resetPasswordOtp !== hashOtp(otp)) {
        throw new ApiError(400, "Invalid OTP.");
    }

    user.password = newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpiresAt = undefined;
    user.refreshToken = undefined;

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, "Password reset successful."));
});

export default resetPassword;