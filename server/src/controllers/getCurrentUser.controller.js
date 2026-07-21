import User from "../models/User.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "-password -refreshToken -verificationOtp -verificationOtpExpiry -resetPasswordOtp -resetPasswordOtpExpiry"
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Current user fetched successfully."
            )
        );
});

export default getCurrentUser;