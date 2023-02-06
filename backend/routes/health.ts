import * as express from "express";
import { HealthController } from "../controllers/health";

const health: express.Router = express.Router();

health.get("/health", (req, res) => {
  HealthController.checkHealth(req, res);
});

export { health };
