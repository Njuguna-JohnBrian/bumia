import express, { NextFunction, Request, Response } from "express";
import {
  getUserProfile,
  loginUser,
  logout,
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

auth.get(
  "/me",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    return getUserProfile(req, res, next);
  }
);

/**
 * logout user
 */

auth.get(
  "/logout",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    return logout(req, res, next);
  }
);

export { auth };
