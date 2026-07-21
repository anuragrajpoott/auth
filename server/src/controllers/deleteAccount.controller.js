import User from "../models/User.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import cookieOptions from "../config/cookieOptions.js";

const deleteAccount = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.user._id);

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, null, "Account deleted successfully."));
});

export default deleteAccount;