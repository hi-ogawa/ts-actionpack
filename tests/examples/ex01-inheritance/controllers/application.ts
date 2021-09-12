import { BaseController } from "../../../../src";

export abstract class ApplicationController extends BaseController {
  protected success(data: any) {
    this.res.json({ status: "success", data });
  }

  protected error(message?: string, status: number = 400) {
    this.res.status(status).json({ status: "error", message });
  }
}
