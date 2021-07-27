import type { Request, Response } from "express";

export type HttpMethod = "get" | "post" | "patch" | "delete";

export type Path = string | RegExp;

export type ControllerConstructor<T> = new (req: Request, res: Response) => T;

export type Action<T> = (this: T) => Promise<void> | void;

// cf. https://github.com/microsoft/TypeScript/pull/21316
export type ActionName<T> = {
  [K in keyof T]: T[K] extends Action<T> ? K : never;
}[keyof T];
