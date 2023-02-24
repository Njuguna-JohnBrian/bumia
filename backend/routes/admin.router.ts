import express, { NextFunction, Request, Response } from "express";
import { getAllUsers } from "../controllers/admin.controller";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middlewares/authenticator.middleware";

const admin: express.Router = express.Router();

const baseUrl = "/admin/";

const adminRole = "admin";

/**
 * Get all users
 */

admin.get(
  baseUrl + "users",
  isAuthenticated,
  authorizeRoles(adminRole),
  (req: Request, res: Response, next: NextFunction) => {
    return getAllUsers(req, res, next);
  }
);

export { admin };
