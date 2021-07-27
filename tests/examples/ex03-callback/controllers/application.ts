import { BaseController } from "./base";
import { config } from "../config";

const validCredential = Buffer.from(
  `${config.BASIC_AUTH_USERNAME}:${config.BASIC_AUTH_PASSWORD}`
).toString("base64");
const validAuthorization = `Basic ${validCredential}`;

// TODO: type-check of `ApplicationController.BeforeAction` fails if abstract
export class ApplicationController extends BaseController {
  protected success(data: any) {
    this.res.json({ status: "success", data });
  }

  protected error(message?: string, status: number = 400) {
    this.res.status(status).json({ status: "error", message });
  }

  // TODO: type-check fails unless public
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
    return ApplicationController.BeforeAction("basicAuthenticate");
  }
}
