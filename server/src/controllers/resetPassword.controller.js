import User from "../models/User.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import hashOtp from "../utils/hashOtp.js";

const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        throw new ApiError(400, "All fields are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const isOtpExpired =
        !user.resetPasswordOtp ||
        !user.resetPasswordOtpExpiry ||
        user.resetPasswordOtpExpiry < new Date();

    if (isOtpExpired) {
        throw new ApiError(400, "OTP expired.");
    }

    const isOtpValid = user.resetPasswordOtp === hashOtp(otp);

    if (!isOtpValid) {
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

export default resetPassword;