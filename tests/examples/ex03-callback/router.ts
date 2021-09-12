import { Router } from "express";

import { makeRouterDSL } from "../../../src";
import { HomeController } from "./controllers";

export const router = Router();
const { GET } = makeRouterDSL(router);

// prettier-ignore
{
  GET("/",        HomeController, "index");
  GET("/secret1", HomeController, "secret1");
  GET("/secret2", HomeController, "secret2");
  GET("/secret3", HomeController, "secret3");
  GET("*",        HomeController, "notFound");
}
