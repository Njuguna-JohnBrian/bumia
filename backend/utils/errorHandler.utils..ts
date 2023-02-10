import { IError } from "../interfaces/error.interface";

export class ErrorHandler extends IError {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
