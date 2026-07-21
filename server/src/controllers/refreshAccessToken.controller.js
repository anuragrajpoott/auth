import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateTokens from "../utils/generateToken.js";
import { cookieOptions } from "../utils/cookieOptions.js";

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required.");
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    } catch {
        throw new ApiError(401, "Invalid refresh token.");
    }

    const user = await User.findById(decodedToken.id).select("+refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid refresh token.");
    }

    if (user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(401, "Refresh token mismatch.");
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, "Access token refreshed."));
});

export default refreshAccessToken;