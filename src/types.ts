export type HttpMethod = "get" | "post" | "patch" | "delete";

export type RoutingMethod = "all" | HttpMethod;

export type Path = string | RegExp;

export type Action<T> = (this: T) => Promise<void> | void;

export type BoundAction = () => Promise<void> | void;

// cf. https://github.com/microsoft/TypeScript/pull/21316
export type ActionName<T> = {
  [K in keyof T]: T[K] extends Action<T> ? K : never;
}[keyof T];
