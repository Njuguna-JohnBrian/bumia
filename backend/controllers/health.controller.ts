import { Response, Request, NextFunction } from "express";

import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors.middlewares";

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
    return res.status(200).json({
      success: true,
      message: "System is operational and healthy",
    });
  }
);

export { checkHealth };
