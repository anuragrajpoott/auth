import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const authenticate = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ??
        (req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.replace("Bearer ", "")
            : null);

    if (!token) {
        throw new ApiError(401, "Authentication required.");
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch {
        throw new ApiError(401, "Invalid or expired token.");
    }

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new ApiError(401, "User no longer exists.");
    }

    req.user = user;
    next();
});

export const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        throw new ApiError(403, "You are not authorized to access this resource.");
    }

    next();
};