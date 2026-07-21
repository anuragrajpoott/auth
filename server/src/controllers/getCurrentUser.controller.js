import User from "../models/user.model.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "-password -refreshToken -verificationOtp -verificationOtpExpiresAt -resetPasswordOtp -resetPasswordOtpExpiresAt"
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Current user fetched successfully.",
            user
        )
    );
});

export default getCurrentUser;