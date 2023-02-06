import * as express from "express";
import { HealthController } from "../controllers/health.controller";

const health: express.Router = express.Router();

const healthBaseUrl = "/health";

health.get(`${healthBaseUrl}`, (req, res) => {
  HealthController.checkHealth(req, res);
});

export { health };
