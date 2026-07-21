import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import ApiError from "./utils/ApiError.js";

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});

app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(limiter);

app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AuthFlow API is running.",
    });
});

app.use("/api/v1/auth", authRoutes);

app.use("*", (req, res, next) => {
    next(new ApiError(404, `Cannot ${req.method} ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;