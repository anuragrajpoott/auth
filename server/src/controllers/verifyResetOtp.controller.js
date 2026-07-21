import User from "../models/User.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import hashOtp from "../utils/hashOtp.js";

const verifyResetOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required.");
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

    return res
        .status(200)
        .json(new ApiResponse(200, null, "OTP verified successfully."));
});

export default verifyResetOtp;