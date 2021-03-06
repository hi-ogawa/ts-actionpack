import * as Multer from "multer";

import { BaseController, promisifyMiddleware } from "../../../../src";

const multer = Multer({ storage: Multer.memoryStorage() });

export abstract class ApplicationController extends BaseController {
  protected success(data: any) {
    this.res.json({ status: "success", data });
  }

  protected error(message?: string, status = 400) {
    this.res.status(status).json({ status: "error", message });
  }

  protected async getMultipart(
    field: string
  ): Promise<Express.Multer.File | undefined> {
    await promisifyMiddleware(multer.single(field))(this.req, this.res);
    return this.req.file;
  }
}
