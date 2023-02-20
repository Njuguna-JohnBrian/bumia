import { Request, Response } from "express";
import { User } from "../models/users.model";
import { ErrorHandler } from "../utils/errorHandler.utils.";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware";
import { NextFunction } from "express";
import { AuthInput } from "../interfaces/user.interface";
import { sendJwtToken } from "../utils/sendJwtToke.utils";

/**User Registration
 *
 * /register
 * @param {*} req request body with `id` as parameter
 * @param {*} res response body with the found product
 */

const registerUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, avatar } = <AuthInput>req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar,
    });

    if (!user) {
      return next(new ErrorHandler("Registration failed", 404));
    }

    return sendJwtToken(user, 200, res);
  }
);

export { registerUser };
