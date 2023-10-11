import express, { Response, Request } from "express";
import { seedData } from "../controllers/seed.controller";

const seed: express.Router = express.Router();

const seedBaseUrl = "/seed";

seed.post(
  `${seedBaseUrl}`,
  (req: Request, res: Response) => {
    return seedData(req, res);
  }
);

export { seed };
