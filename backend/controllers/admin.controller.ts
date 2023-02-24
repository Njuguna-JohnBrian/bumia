import { NextFunction, Request, Response } from "express";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware";
import { User } from "../models/users.model";
import { ErrorHandler } from "../utils/errorHandler.utils.";

const getAllUsers = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    if (!users) {
      return next(new ErrorHandler("No users found", 404));
    }

    return res.status(200).json({
      success: true,
      users,
    });
  }
);
