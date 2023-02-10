import { Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";

const errorMiddleware = (err, res: Response) => {
  err.statusCode = err.stausCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    if (err.name === "CastError") {
      const message = `Resource not found. Invalid ${err.path}`;

      error = new ErrorHandler(message, 400);
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map(
        (value: any) => value.message
      );

      error = new ErrorHandler(String(message), 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export { errorMiddleware };
