import { AbstractController } from "../../../../src";

export abstract class ApplicationController extends AbstractController {
  protected success(data: any) {
    this.res.json({ status: "success", data });
  }

  protected error(message?: string, status: number = 400) {
    this.res.status(status).json({ status: "error", message });
  }
}
