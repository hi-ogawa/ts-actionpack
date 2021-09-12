import {
  Action,
  ActionName,
  IControllerConstructor,
  MixinConstructor,
} from "../types";

type BeforeActionReturnType<T> = (
  prototype: T,
  methodName: string,
  descriptor: Pick<TypedPropertyDescriptor<Action<T>>, "value">
) => void;

export function BeforeActionMixin<TBase extends MixinConstructor>(Base: TBase) {
  return class BeforeActionController extends Base {
    // prettier-ignore
    static BeforeAction<T extends BeforeActionController>(this: IControllerConstructor<T>, callback: Action<T>): BeforeActionReturnType<T>;

    // prettier-ignore
    static BeforeAction<T extends BeforeActionController>(this: IControllerConstructor<T>, callback: ActionName<T>): BeforeActionReturnType<T>;

    // prettier-ignore
    static BeforeAction<T extends BeforeActionController>(this: IControllerConstructor<T>, _callback: Action<T> | ActionName<T>): BeforeActionReturnType<T> {
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
  };
}
