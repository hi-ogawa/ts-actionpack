import { ApplicationController } from "./application";

const schemaX = {
  type: "object",
  required: ["x"],
  properties: {
    x: { type: "number" },
  },
};

const schemaXY = {
  type: "object",
  required: ["x", "y"],
  properties: {
    x: { type: "number" },
    y: { type: "number" },
  },
};

export class HomeController extends ApplicationController {
  add() {
    const { x, y } = this.validate(schemaXY, this.req.query);
    this.success(x + y);
  }

  @HomeController.ValidateQuery(schemaX)
  double() {
    const { x } = this.req.query as any as { x: number };
    this.success(2 * x);
  }
}
