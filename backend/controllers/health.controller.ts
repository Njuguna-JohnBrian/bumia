import { Response, Request, NextFunction } from "express";

import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware";
import { ErrorHandler } from "../utils/errorHandler.utils.";
import {
  BumiaDefinitions,
  ControllerMessages,
} from "../interfaces/error.interface";

/**Check Bumia Health
 *
 * /health
 *
 * @param {*} req request body with `id` as parameter
 * @param {*} res response body with the found product
 * @param {*} next next controller to take over execution
 */
const checkHealth = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    if (res.errored) {
      return next(new ErrorHandler(BumiaDefinitions.INTERNAL_ERROR, 500));
    }
    return res.status(200).json({
      success: true,
      message: ControllerMessages.HEALTH_MESSAGE,
    });
  }
);

export { checkHealth };
