import "mocha";

import * as assert from "assert/strict";
import * as supertest from "supertest";

import { app } from "./app";

describe("ex04-validation", () => {
  describe("/add", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/add");
      assert.equal(res.status, 400);
    });

    it("case2", async () => {
      const res = await supertest(app).get("/add").query({ x: 1, y: 2 });
      assert.equal(res.status, 200);
      assert.equal(res.body.data, 3);
    });
  });

  describe("/double", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/double");
      assert.equal(res.status, 400);
    });

    it("case2", async () => {
      const res = await supertest(app).get("/double").query({ x: 64 });
      assert.equal(res.status, 200);
      assert.equal(res.body.data, 128);
    });
  });
});
