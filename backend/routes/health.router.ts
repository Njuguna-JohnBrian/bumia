import * as express from "express";
import { checkHealth } from "../controllers/health.controller";

const health: express.Router = express.Router();

const healthBaseUrl = "/health";

health.get(`${healthBaseUrl}`, (req, res) => {
  return checkHealth(req, res);
});

export { health };
