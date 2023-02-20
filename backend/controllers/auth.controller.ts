import { Request, Response } from "express";
import { User } from "../models/users.model";
import { ErrorHandler } from "../utils/errorHandler.utils.";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware";
import { NextFunction } from "express";
import { AuthInput, ILogin } from "../interfaces/user.interface";
import { sendJwtToken } from "../utils/sendJwtToke.utils";
import { IRequest } from "../interfaces/error.interface";

/**User Registration
 *
 * /register
 * @param {*} req request body with user `AuthInput` payload
 * @param {*} res response body with the user object
 * @param {*} next next controller to take over execution
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

/**User Login
 *
 * /register
 * @param {*} req request body with user `ILogin` payload
 * @param {*} res response body with the user object
 * @param {*} next next controller to take over execution
 */

const loginUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <ILogin>req.body;

    /**
     * validate email and password
     */
    if (!email || !password) {
      return next(
        new ErrorHandler("Please enter your email and password", 404)
      );
    }

    /**
     * db user lookup
     */
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password provided", 404));
    }

    /**
     * validate password
     */
    const passwordMatches = await user.comparePassword(password);
    if (!passwordMatches) {
      return next(new ErrorHandler("Invalid password provided", 404));
    }

    return sendJwtToken(user, 200, res);
  }
);

/**Get user profile
 *
 * /me
 * @param {*} req request body with id in `IRequest`
 * @param {*} res response body with user profile
 * @param {*} next next controller to take over execution
 */

const getUserProfile = CatchAsyncErrors(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User profile not found", 404));
    }

    return res.status(200).json({
      success: true,
      user,
    });
  }
);

export { registerUser, loginUser, getUserProfile };
