import { BoundAction, IController, Request, Response } from "./types";

export class BaseController implements IController {
  constructor(public req: Request, public res: Response) {}

  async processAction(action: BoundAction) {
    await action();
  }
}
