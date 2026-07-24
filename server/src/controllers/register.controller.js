import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import generateOtp from "../utils/generateOtp.js";
import hashOtp from "../utils/hashOtp.js";

import sendEmail from "../utils/sendEmail.js";
import emailTemplates from "../utils/emailTemplates.js";

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
        verificationOtpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    try {
        await sendEmail({
            to: user.email,
            ...emailTemplates.verifyEmail(user.name, otp),
        });
    } catch (error) {
        await User.findByIdAndDelete(user._id);

        throw new ApiError(
            500,
            "Failed to send verification email. Please try again."
        );
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            "Registration successful. Please verify your email."
        )
    );
});

export default register;