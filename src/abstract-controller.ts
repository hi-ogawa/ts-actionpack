import type { BoundAction, Request, Response } from "./types";

export abstract class AbstractController {
  constructor(protected req: Request, protected res: Response) {}

  async processAction(action: BoundAction) {
    await action();
  }
}

export type ControllerConstructor<T extends AbstractController> = new (
  req: Request,
  res: Response
) => T;
