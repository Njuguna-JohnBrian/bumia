import express, { NextFunction, Request, Response } from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/auth.controller";

import { isAuthenticated } from "../middlewares/authenticator.middleware";

const auth: express.Router = express.Router();

/**
 * Register user
 */

auth.post("/register", (req: Request, res: Response, next: NextFunction) => {
  return registerUser(req, res, next);
});

/**
 * Login user
 */

auth.post("/login", (req: Request, res: Response, next: NextFunction) => {
  return loginUser(req, res, next);
});

/**
 * Get my profile
 */

auth.post(
  "/me",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    return getUserProfile(req, res, next);
  }
);

export { auth };
