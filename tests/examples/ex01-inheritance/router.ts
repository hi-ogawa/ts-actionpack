import { Router } from "express";
import { makeRouterDSL } from "../../../src";
import { HomeController } from "./controllers";

export const router = Router();
const { GET } = makeRouterDSL(router);

// prettier-ignore
{
  GET("/",      HomeController, "index");
  GET("/ping",  HomeController, "ping");
  GET("*",      HomeController, "notFound");
}
