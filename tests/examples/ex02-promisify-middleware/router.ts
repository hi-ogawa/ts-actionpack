import { Router } from "express";

import { makeRouterDSL } from "../../../src";
import { HomeController } from "./controllers";

export const router = Router();
const { GET, POST } = makeRouterDSL(router);

// prettier-ignore
{
  GET   ("/",       HomeController, "index");
  POST  ("/base64", HomeController, "base64");
  GET   ("*",       HomeController, "notFound");
}
