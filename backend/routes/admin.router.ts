import express, { NextFunction, Request, Response } from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/admin.controller";
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

/**
 * Get single user
 */

admin.get(
  baseUrl + "user/:id",
  isAuthenticated,
  authorizeRoles(adminRole),
  (req: Request, res: Response, next: NextFunction) => {
    return getSingleUser(req, res, next);
  }
);

/**
 * Update user
 */

admin.patch(
  baseUrl + "user/update/:id",
  isAuthenticated,
  authorizeRoles(adminRole),
  (req: Request, res: Response, next: NextFunction) => {
    return updateUser(req, res, next);
  }
);

/**
 * Delete user
 */

admin.delete(
  baseUrl + "user/delete/:id",
  isAuthenticated,
  authorizeRoles(adminRole),
  (req: Request, res: Response, next: NextFunction) => {
    return deleteUser(req, res, next);
  }
);

export { admin };
