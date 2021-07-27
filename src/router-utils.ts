import type { Request, Response, Router } from "express";
import type { RoutingMethod, Path, Action, ActionName } from "./types";
import type { AbstractController } from "./abstract-controller";

// TODO: Rename to ControllerClass
export type ControllerConstructor<T extends AbstractController> = new (
  req: Request,
  res: Response
) => T;

export function defineRoute<T extends AbstractController>(
  router: Router,
  method: RoutingMethod,
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
      await controller.processAction(action.bind(controller));
    } catch (e) {
      next(e);
    }
  });
}

export type RouterDSL = <T extends AbstractController>(
  path: Path,
  klass: ControllerConstructor<T>,
  actionaName: ActionName<T>
) => void;

export function makeRouterDSL(
  router: Router
): Record<Uppercase<RoutingMethod>, RouterDSL> {
  return {
    ALL: (...args) => defineRoute(router, "all", ...args),
    GET: (...args) => defineRoute(router, "get", ...args),
    POST: (...args) => defineRoute(router, "post", ...args),
    PATCH: (...args) => defineRoute(router, "patch", ...args),
    DELETE: (...args) => defineRoute(router, "delete", ...args),
  };
}
