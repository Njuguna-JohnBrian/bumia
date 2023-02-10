import { MongooseError } from "mongoose";

export class IError extends Error {
  statusCode: number;
  path: string;
  errors: MongooseError;
}
