import { BaseController, BeforeActionMixin } from "../../../../src";
import { config } from "../config";

// prettier-ignore
const validCredential = Buffer.from(`${config.BASIC_AUTH_USERNAME}:${config.BASIC_AUTH_PASSWORD}`).toString("base64");

const validAuthorization = `Basic ${validCredential}`;

// prettier-ignore
const BaseApplicationController = BeforeActionMixin(BaseController);

export class ApplicationController extends BaseApplicationController {
  protected success(data: any) {
    this.res.json({ status: "success", data });
  }

  protected error(message?: string, status = 400) {
    this.res.status(status).json({ status: "error", message });
  }

  basicAuthenticate() {
    if (this.req.header("authorization") !== validAuthorization) {
      this.res
        .status(401)
        .header("WWW-Authenticate", 'Basic realm="test", charset="UTF-8"')
        .end();
    }
  }

  // Decorator version
  protected static BasicAuthenticate() {
    return ApplicationController.BeforeAction(this.prototype.basicAuthenticate);
  }
}
