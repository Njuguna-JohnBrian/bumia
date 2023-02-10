import { Response, Request } from "express";

export class HealthController {
  /**Check Bumia Health
   *
   * /health
   *
   * @param {*} req request body with `id` as parameter
   * @param {*} res response body with the found product
   * @param {*} next next controller to take over execution
   */
  static async checkHealth(req: Request, res: Response) {
    try {
      return res.status(200).json({
        success: true,
        message: "System is operational and healthy",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
