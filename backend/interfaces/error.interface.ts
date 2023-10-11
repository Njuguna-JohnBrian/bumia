/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import { MongooseError } from "mongoose";

export class IError extends Error {
  statusCode: number;
  path: string;
  errors: MongooseError;
}

export enum BumiaDefinitions {
  PRODUCTION = "prod",
  DEVELOPMENT = "dev",
  CAST_ERROR = "CastError",
  VALIDATION_ERROR = "ValidationError",
  INTERNAL_ERROR = "Internal server error",
  RESOURCE_NOT_FOUND = "Resource not found. Invalid",
  UNCAUGHT_EXCEPTION = "uncaughtException",
  SHUTTING_EXCEPTION = "Shutting down due to Uncaught Exception",
  UNHANDLED_PROMISE = "unhandledRejection",
  SHUTTING_PROMISE = "Shutting down due to Unhandled Promise Rejections",
}

export enum ControllerMessages {
  HEALTH_MESSAGE = "System is operational and healthy",
  SEED_MESSAGE = "Seed was done successfully",
  PRODUCT_NOT_FOUND = "Product by id:",
  PRODUCT_CREATE_FAIL = "Failed to create product. Please retry",
}

export class IRequest extends Response {
  user: any;
  cookies: any;
  body: any;
}
