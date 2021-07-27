import {
  AbstractController,
  ControllerConstructor,
  Action,
  ActionName,
} from "../../../../src";

type BeforeActionReturnType<T> = (
  prototype: T,
  methodName: string,
  // TODO: Type check fails for the field "descriptor.set".
  //       For now we filter out since we don't use it anyway.
  descriptor: Pick<TypedPropertyDescriptor<Action<T>>, "value">
) => void;

export abstract class BaseController extends AbstractController {
  protected static BeforeAction<T extends BaseController>(
    this: ControllerConstructor<T>,
    callback: Action<T>
  ): BeforeActionReturnType<T>;
  protected static BeforeAction<T extends BaseController>(
    this: ControllerConstructor<T>,
    callback: ActionName<T>
  ): BeforeActionReturnType<T>;
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
}
