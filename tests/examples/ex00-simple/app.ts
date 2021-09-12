import * as express from "express";

import { BaseController, makeRouterDSL } from "../../../src";

// Define controller
class HomeController extends BaseController {
  index() {
    this.res.send("Hello");
  }
  show() {
    this.res.send(`Hello: id = ${this.req.params.id}`);
  }
  create() {
    this.res.sendStatus(200);
  }
  update() {
    this.res.sendStatus(200);
  }
  destroy() {
    this.res.sendStatus(200);
  }
}

// Define router
const router = express.Router();
const { GET, POST, PATCH, DELETE } = makeRouterDSL(router);

// prettier-ignore
{
  GET     ("/",       HomeController,   "index");
  GET     ("/:id",    HomeController,   "show");
  POST    ("/:id",    HomeController,   "create");
  PATCH   ("/:id",    HomeController,   "update");
  DELETE  ("/:id",    HomeController,   "destroy");
}

// Use router
export const app = express();
app.use(router);
