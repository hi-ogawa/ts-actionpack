import "mocha";
import { Router } from "express";
import { makeRouterDSL, AbstractController } from "../src";

describe("ts-actionpack", () => {
  it("case1", () => {
    class Controller extends AbstractController {
      index() {}
      show() {}
      create() {}
      update() {}
      destroy() {}
    }

    const router = Router();
    const { GET, POST, PATCH, DELETE } = makeRouterDSL(router);

    // prettier-ignore
    {
      GET     ("/",       Controller,   "index");
      GET     ("/:id",    Controller,   "show");
      POST    ("/:id",    Controller,   "create");
      PATCH   ("/:id",    Controller,   "update");
      DELETE  ("/:id",    Controller,   "destroy");
    }
  });
});
