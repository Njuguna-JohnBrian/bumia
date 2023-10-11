import { Response, Request } from "express";

import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware";
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
  async (req: Request, res: Response) => {
    if (res.errored) {
      return res.status(500).json({
        success: false,
        message: BumiaDefinitions.INTERNAL_ERROR,
      });
    }
    return res.status(200).json({
      success: true,
      message: ControllerMessages.HEALTH_MESSAGE,
    });
  }
);

export { checkHealth };
