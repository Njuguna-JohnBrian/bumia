import { Request, Response, NextFunction } from "express";

const CatchAsyncErrors =
  (handler: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };

export { CatchAsyncErrors };
