import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import hashOtp from "../utils/hashOtp.js";

const verifyEmail = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required.");
    }

    const user = await User.findOne({ email }).select(
        "+verificationOtp +verificationOtpExpiresAt"
    );

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    if (user.isVerified) {
        throw new ApiError(400, "Email already verified.");
    }

    const isOtpExpired =
        !user.verificationOtp ||
        !user.verificationOtpExpiresAt ||
        user.verificationOtpExpiresAt < new Date();

    if (isOtpExpired) {
        throw new ApiError(400, "OTP expired.");
    }

    if (user.verificationOtp !== hashOtp(otp)) {
        throw new ApiError(400, "Invalid OTP.");
    }

    user.isVerified = true;
    user.verificationOtp = undefined;
    user.verificationOtpExpiresAt = undefined;

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, "Email verified successfully."));
});

export default verifyEmail;