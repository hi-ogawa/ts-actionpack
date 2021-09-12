import type { Request, Response, Router } from "express";

export { Request, Response, Router };

export type HttpMethod = "get" | "post" | "patch" | "delete";

export type RoutingMethod = "all" | HttpMethod;

export type Path = string | RegExp;

export type Action<T> = (this: T) => Promise<void> | void;

export type BoundAction = () => Promise<void> | void;

// cf. https://github.com/microsoft/TypeScript/pull/21316
export type ActionName<T> = {
  [K in keyof T]: T[K] extends Action<T> ? K : never;
}[keyof T];

export interface IControllerConstructor<Controller extends IController> {
  new (req: Request, res: Response): Controller;
}

export interface IController {
  req: Request;
  res: Response;
  processAction(action: BoundAction): Promise<void>;
}

export type MixinConstructor = new (...args: any[]) => IController;
