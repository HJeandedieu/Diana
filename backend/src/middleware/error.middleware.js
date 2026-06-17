import {
    AppError,
    NotFoundError,
    BadRequestError,
    ConflictError
} from "../utils/error.js";

const errorHandler = (err, req, res, next) => {
    console.error(err);

    let finalError = err;

    if (err?.code === "P2025") {
        finalError = new NotFoundError("Resource not found");
    }
    else if (err?.code === "P2002") {
        const targetFields = err.meta?.target
            ? ` (${err.meta.target.join(", ")})`
            : "";

        finalError = new ConflictError(
            `Duplicate field value entered${targetFields}`
        );
    }
    else if (err?.code === "P2003") {
        finalError = new BadRequestError(
            "Foreign key constraint failed"
        );
    }
    else if (
        err?.name === "PrismaClientValidationError"
    ) {
        finalError = new BadRequestError(
            "Invalid input data types provided"
        );
    }

    const isOperational = finalError instanceof AppError;

    res.status(isOperational ? finalError.statusCode : 500).json({
        success: false,
        error: isOperational
            ? finalError.message
            : "Internal Server Error"
    });
};

export default errorHandler;