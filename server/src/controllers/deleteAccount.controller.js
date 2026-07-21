import User from "../models/user.model.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { cookieOptions } from "../utils/cookieOptions.js";

const deleteAccount = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.user._id);

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, "Account deleted successfully."));
});

export default deleteAccount;