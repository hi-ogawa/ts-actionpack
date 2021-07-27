import { ApplicationController } from "./application";

export class HomeController extends ApplicationController {
  async index() {
    this.success("hello");
  }

  async ping() {
    this.success("pong");
  }

  async notFound() {
    this.error(`Not found ${this.req.originalUrl}`, 404);
  }
}
