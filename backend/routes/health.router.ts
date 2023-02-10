import express, { Response, Request, NextFunction } from "express";
import { checkHealth } from "../controllers/health.controller";

const health: express.Router = express.Router();

const healthBaseUrl = "/health";

health.get(
  `${healthBaseUrl}`,
  (req: Request, res: Response, next: NextFunction) => {
    return checkHealth(req, res, next);
  }
);

export { health };
