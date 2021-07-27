import {
  AbstractController,
  ControllerConstructor,
} from "./abstract-controller";
import { Action, ActionName, BoundAction } from "./types";

type BeforeActionReturnType<T> = (
  prototype: T,
  methodName: string,
  descriptor: Pick<TypedPropertyDescriptor<Action<T>>, "value">
) => void;

export abstract class BaseController extends AbstractController {
  //
  // Decorator for before-action callback
  //

  // prettier-ignore
  protected static BeforeAction<T extends BaseController>(this: ControllerConstructor<T>, callback: Action<T>): BeforeActionReturnType<T>;
  // prettier-ignore
  protected static BeforeAction<T extends BaseController>(this: ControllerConstructor<T>, callback: ActionName<T>): BeforeActionReturnType<T>;

  protected static BeforeAction<T extends BaseController>(
    this: ControllerConstructor<T>,
    _callback: Action<T> | ActionName<T>
  ): BeforeActionReturnType<T> {
    let callback: Action<T>;
    if (typeof _callback === "function") {
      callback = _callback;
    } else {
      callback = this.prototype[_callback];
    }
    return function (_prototype, _methodName, descriptor) {
      const oldMethod = descriptor.value!;
      descriptor.value = async function (this: T) {
        await callback.apply(this);
        if (this.res.writableEnded) {
          return;
        }
        await oldMethod.apply(this);
      };
    };
  }

  //
  // Default error handler
  //

  protected handleError(error: Error) {
    throw error;
  }

  async processAction(action: BoundAction) {
    try {
      await super.processAction(action);
    } catch (e) {
      this.handleError(e);
    }
  }
}
