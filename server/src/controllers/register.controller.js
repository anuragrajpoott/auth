import User from "../models/User.js";

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

    await User.create({
        name,
        email,
        password,
        verificationOtp: hashOtp(otp),
        verificationOtpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmail({
        to: email,
        ...emailTemplates.verifyEmail(name, otp),
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                null,
                "Registration successful. Please verify your email."
            )
        );
});