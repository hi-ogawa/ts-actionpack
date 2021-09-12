import "mocha";

import * as assert from "assert/strict";
import * as supertest from "supertest";

import { app } from "./app";

describe("ex01-inheritance", () => {
  describe("/", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/");
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { status: "success", data: "hello" });
    });
  });

  describe("/ping", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/ping");
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { status: "success", data: "pong" });
    });
  });

  describe("/no-such/-path", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/no-such/-path");
      assert.equal(res.status, 404);
      assert.deepEqual(res.body, {
        status: "error",
        message: "Not found /no-such/-path",
      });
    });
  });
});
