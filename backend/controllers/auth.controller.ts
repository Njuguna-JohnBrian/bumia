import { Request, Response } from "express";
import { User } from "../models/users.model";
import { ErrorHandler } from "../utils/errorHandler.utils.";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware";
import { NextFunction } from "express";
import { AuthInput, ILogin } from "../interfaces/user.interface";
import { sendJwtToken } from "../utils/sendJwtToke.utils";
import { IRequest } from "../interfaces/error.interface";
import { sendEmail } from "../utils/sendEmail.utils";

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

/**Logout user
 *
 * /logout
 * @param {*} req request body
 * @param {*} res response body
 * @param {*} next next controller to take over execution
 */

const logout = CatchAsyncErrors(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
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

/**Forgot password
 *
 * /password/forgot
 * @param {*} req request body with user email
 * @param {*} res response body with success message
 * @param {*} next next controller to take over execution
 */
const forgotPassword = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = <ILogin>req.body;

    if (!email) {
      return next(new ErrorHandler("Please provide an email", 400));
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return next(new ErrorHandler(`User with email ${email} not found`, 404));
    }

    /**
     * get and save reset token
     */
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    /**
     * create reset url
     */
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/bumia/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, please ignore it.`;

    try {
      console.log("here1");

      await sendEmail({
        email: email,
        subject: "Bumia Password Recovery",
        message: message,
      });

      console.log("here2");

      return res.status(200).json({
        success: true,
        message: `Email sent to ${email}`,
      });
    } catch (error) {
      console.log("here3");

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export { registerUser, loginUser, getUserProfile, logout, forgotPassword };
