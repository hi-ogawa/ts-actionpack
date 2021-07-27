import type { Router } from "express";
import type {
  HttpMethod,
  Path,
  ControllerConstructor,
  Action,
  ActionName,
} from "./types";

export function defineRoute<T>(
  router: Router,
  method: HttpMethod,
  path: Path,
  klass: ControllerConstructor<T>,
  actionName: ActionName<T>
) {
  router[method](path, async (req, res, next) => {
    try {
      const controller = new klass(req, res);
      // NOTE: this type casting is safe since `ActionName<T>` ensures
      //       the type of the argument at the caller site.
      const action = controller[actionName] as unknown as Action<T>;
      await action.apply(controller);
    } catch (e) {
      next(e);
    }
  });
}

export type RouterDSL = <T>(
  path: Path,
  klass: ControllerConstructor<T>,
  actionaName: ActionName<T>
) => void;

export function makeRouterDSL(
  router: Router
): Record<Uppercase<HttpMethod>, RouterDSL> {
  return {
    GET: (...args) => defineRoute(router, "get", ...args),
    POST: (...args) => defineRoute(router, "post", ...args),
    PATCH: (...args) => defineRoute(router, "patch", ...args),
    DELETE: (...args) => defineRoute(router, "delete", ...args),
  };
}
