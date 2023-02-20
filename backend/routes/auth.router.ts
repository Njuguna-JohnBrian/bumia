import express, { NextFunction, Request, Response } from "express";
import {
  forgotPassword,
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
 * Logout user
 */

auth.get(
  "/logout",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    return logout(req, res, next);
  }
);

/**
 * Forgot password
 */

auth.post(
  "/password/forgot",
  (req: Request, res: Response, next: NextFunction) => {
    return forgotPassword(req, res, next);
  }
);

/**
 * Forgot password
 */

auth.put(
  "/password/reset/:token",
  (req: Request, res: Response, next: NextFunction) => {
    return forgotPassword(req, res, next);
  }
);

export { auth };
