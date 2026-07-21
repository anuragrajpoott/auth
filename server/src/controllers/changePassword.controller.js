import User from "../models/User.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        throw new ApiError(400, "Both passwords are required.");
    }

    const user = await User.findById(req.user._id);

    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
        throw new ApiError(400, "Current password is incorrect.");
    }

    user.password = newPassword;

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Password changed successfully."));
});

export default changePassword;