import * as express from "express";
import { ProductController } from "../controllers/health";

const health: express.Router = express.Router();

health.get("/health", (req, res) => {
  ProductController.checkHealth(req, res);
});

export { health };
