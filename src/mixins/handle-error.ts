import { BoundAction, MixinConstructor } from "../types";

export function HandleErrorMixin<TBase extends MixinConstructor>(Base: TBase) {
  return class HandleErrorController extends Base {
    async processAction(action: BoundAction) {
      try {
        await super.processAction(action);
      } catch (e: unknown) {
        if (e instanceof Error) {
          this.handleError(e);
        }
      }
    }

    // NOTE/TODO: Mixin method cannot be `protected`
    handleError(error: Error) {
      throw error;
    }
  };
}
