import { BaseController } from "../../../../src";
import Ajv from "ajv";

const ajv = new Ajv({
  useDefaults: true,
  coerceTypes: true,
});

export class ApplicationController extends BaseController {
  protected success(data: any) {
    this.res.json({ status: "success", data });
  }

  protected error(message?: string, status: number = 400) {
    this.res.status(status).json({ status: "error", message });
  }

  protected validate(schema: any, data: any): any {
    const validator = ajv.compile(schema);
    if (!validator(data)) {
      const error = new Ajv.ValidationError(validator.errors!);
      error.message = ajv.errorsText(error.errors as any);
      throw error;
    }
    return data;
  }

  protected static ValidateQuery(schema: any) {
    return ApplicationController.BeforeAction(function (this) {
      this.validate(schema, this.req.query);
    });
  }

  protected handleError(error: Error) {
    if (error instanceof Ajv.ValidationError) {
      this.error(`Validation error: ${error}`);
      return;
    }
    this.error(`Unknown error: ${error}`, 500);
  }
}
