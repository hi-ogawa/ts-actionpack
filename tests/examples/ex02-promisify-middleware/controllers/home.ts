import { ApplicationController } from "./application";

export class HomeController extends ApplicationController {
  async index() {
    this.success("hello");
  }

  async base64() {
    const file = await this.getMultipart("file");
    if (!file) {
      return this.error("File not uploaded");
    }
    const base64 = file.buffer.toString("base64");
    this.success({ base64, mimetype: file.mimetype });
  }

  async notFound() {
    this.error(`Not found ${this.req.originalUrl}`, 404);
  }
}
