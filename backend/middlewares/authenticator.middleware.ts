/* eslint-disable @typescript-eslint/no-explicit-any */
import * as jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/errorHandler.utils.";
import { CatchAsyncErrors } from "./catchAsyncErrors.middleware";
import { User } from "../models/users.model";
import { IRequest } from "../interfaces/error.interface";

class ITokenPayload implements jwt.JwtPayload {
  id: string;
}
const isAuthenticated = CatchAsyncErrors(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler("Login first to access this resource", 400));
    }

    const decodedToken: ITokenPayload | any = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = await User.findById(decodedToken.id);

    next();
  }
);

const authorizeRoles = (...roles: Array<string>) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

export { isAuthenticated, authorizeRoles };
