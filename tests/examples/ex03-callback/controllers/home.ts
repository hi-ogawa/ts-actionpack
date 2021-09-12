import { ApplicationController } from "./application";

export class HomeController extends ApplicationController {
  async index() {
    this.success("hello");
  }

  @HomeController.BeforeAction("basicAuthenticate")
  async secret1() {
    this.success("1terces");
  }

  @HomeController.BeforeAction(HomeController.prototype.basicAuthenticate)
  async secret2() {
    this.success("2terces");
  }

  @HomeController.BasicAuthenticate()
  async secret3() {
    this.success("3terces");
  }

  async notFound() {
    this.error(`Not found ${this.req.originalUrl}`, 404);
  }
}
