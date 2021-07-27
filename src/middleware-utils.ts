import type { Request, Response, RequestHandler } from "express";

export function promisifyMiddleware(middleware: RequestHandler) {
  return function (req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      function next(err?: any) {
        err ? reject(err) : resolve();
      }
      middleware(req, res, next);
    });
  };
}
