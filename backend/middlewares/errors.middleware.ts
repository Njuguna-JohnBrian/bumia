/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler.utils.";
import { IError } from "../interfaces/error.interface";

const errorMiddleware = (
  err: IError,
  req: unknown,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    return res.status(err.statusCode).json({
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
      const message = Object.values(err.errors).map((value) => value.message);

      error = new ErrorHandler(String(message), 400);
    }

    return res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export default errorMiddleware;
