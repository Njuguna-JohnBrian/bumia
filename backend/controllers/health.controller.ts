import { Response, Request } from "express";

export class HealthController {
  static async checkHealth(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      message: "System is operational and healthy",
    });
  }
}
