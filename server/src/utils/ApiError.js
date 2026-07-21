class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong.") {
        super(message);

        this.name = "ApiError";
        this.statusCode = statusCode;
        this.success = false;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;