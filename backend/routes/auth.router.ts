import express, { NextFunction, Request, Response } from "express";
import { registerUser } from "../controllers/auth.controller";

const auth: express.Router = express.Router();

/**
 * Register user
 */

auth.post("/register", (req: Request, res: Response, next: NextFunction) => {
  return registerUser(req, res, next);
});

export { auth };
