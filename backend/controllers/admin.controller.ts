import { NextFunction, Request, Response } from "express";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware";
import { User } from "../models/users.model";
import { ErrorHandler } from "../utils/errorHandler.utils.";
import { IUser } from "../interfaces/user.interface";

/**Get all users
 *
 * /admin/users
 * @param {*} req request body
 * @param {*} res response body with all users
 * @param {*} next next controller to take over execution
 */
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

/**Get single user
 *
 * /admin/user/:id
 * @param {*} req request query param with user `id`
 * @param {*} res response body with user details
 * @param {*} next next controller to take over execution
 */
const getSingleUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User with id ${req.params.id} not found`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      user,
    });
  }
);

/**Update user
 *
 * /admin/user/update/:id
 * @param {*} req request body `IUser` `name` `email` and new `role`
 * @param {*} res response body with updated user details
 * @param {*} next next controller to take over execution
 */
const updateUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, role } = <IUser>req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!user) {
      return next(new ErrorHandler("User details failed to update", 400));
    }

    return res.status(200).json({
      success: true,
      user,
    });
  }
);
