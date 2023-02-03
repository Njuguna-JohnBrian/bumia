import { Response, Request } from "express";

export class ProductController {
  static async checkHealth(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
    });
  }
}
