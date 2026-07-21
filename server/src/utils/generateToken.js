import User from "../models/user.model.js";
import ApiError from "./ApiError.js";

const generateTokens = async (userId) => {
    const user = await User.findById(userId).select("+refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
        accessToken,
        refreshToken,
    };
};

export default generateTokens;