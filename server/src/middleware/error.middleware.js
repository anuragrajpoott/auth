const errorHandler = (err, req, res, _next) => {
    const { NODE_ENV } = process.env;

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error.";

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(({ message }) => message)
            .join(", ");
    } else if (err.code === 11000) {
        statusCode = 409;

        const field = Object.keys(err.keyValue)[0];
        message = `${field.charAt(0).toUpperCase()}${field.slice(1)} already exists.`;
    } else if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource identifier.";
    } else if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid authentication token.";
    } else if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Authentication token has expired.";
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(NODE_ENV === "development" && {
            stack: err.stack,
        }),
    });
};

export default errorHandler;