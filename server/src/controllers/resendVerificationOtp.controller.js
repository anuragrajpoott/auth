import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import generateOtp from "../utils/generateOtp.js";
import hashOtp from "../utils/hashOtp.js";

import sendEmail from "../utils/sendEmail.js";
import emailTemplates from "../utils/emailTemplates.js";

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
    user.verificationOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await user.save({ validateBeforeSave: false });

    await sendEmail({
        to: user.email,
        ...emailTemplates.verifyEmail(user.name, otp),
    });

    return res.status(200).json(
        new ApiResponse(200, "Verification OTP sent successfully.")
    );
});

export default resendVerificationOtp;