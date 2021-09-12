import type {
  Router,
  RoutingMethod,
  Path,
  Action,
  ActionName,
  IController,
  IControllerConstructor,
} from "./types";

export function defineRoute<T extends IController>(
  router: Router,
  method: RoutingMethod,
  path: Path,
  Klass: IControllerConstructor<T>,
  actionName: ActionName<T>
) {
  router[method](path, async (req, res, next) => {
    try {
      const controller = new Klass(req, res);
      // NOTE: this type casting is safe since `ActionName<T>` ensures
      //       the type of the argument at the caller site.
      const action = controller[actionName] as unknown as Action<T>;
      await controller.processAction(action.bind(controller));
    } catch (e) {
      next(e);
    }
  });
}

export type RouterDSL = <T extends IController>(
  path: Path,
  klass: IControllerConstructor<T>,
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
