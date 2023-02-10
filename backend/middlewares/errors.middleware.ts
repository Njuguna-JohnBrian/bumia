/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler.utils.";
import { BumiaDefinitions, IError } from "../interfaces/error.interface";

const errorMiddleware = (
  err: IError,
  req: unknown,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === BumiaDefinitions.DEVELOPMENT) {
    return res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === BumiaDefinitions.PRODUCTION) {
    let error = { ...err };

    error.message = err.message;

    if (err.name === BumiaDefinitions.CAST_ERROR) {
      const message = `${BumiaDefinitions.RESOURCE_NOT_FOUND} ${err.path}`;

      error = new ErrorHandler(message, 400);
    }

    if (err.name === BumiaDefinitions.VALIDATION_ERROR) {
      const message = Object.values(err.errors).map((value) => value.message);

      error = new ErrorHandler(String(message), 400);
    }

    return res.status(err.statusCode).json({
      success: false,
      message: error.message || BumiaDefinitions.INTERNAL_ERROR,
    });
  }
};

export default errorMiddleware;
