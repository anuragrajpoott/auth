import User from "../models/User.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import hashOtp from "../utils/hashOtp.js";

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

    const isOtpExpired =
        !user.verificationOtp ||
        !user.verificationOtpExpiry ||
        user.verificationOtpExpiry < new Date();

    if (isOtpExpired) {
        throw new ApiError(400, "OTP expired.");
    }

    const isOtpValid = user.verificationOtp === hashOtp(otp);

    if (!isOtpValid) {
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

export default verifyEmail;