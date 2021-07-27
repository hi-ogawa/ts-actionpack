import "mocha";
import * as assert from "assert/strict";
import * as supertest from "supertest";
import { app } from "./app";

describe("ex03-callback", () => {
  describe("/", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/");
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { status: "success", data: "hello" });
    });
  });

  describe("/secret1", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/secret1");
      assert.equal(res.status, 401);
    });

    it("case2", async () => {
      const res = await supertest(app).get("/secret1").auth("cafe", "babe");
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { status: "success", data: "1terces" });
    });
  });

  describe("/secret2", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/secret2");
      assert.equal(res.status, 401);
    });

    it("case2", async () => {
      const res = await supertest(app).get("/secret2").auth("cafe", "babe");
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { status: "success", data: "2terces" });
    });
  });

  describe("/secret3", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/secret3");
      assert.equal(res.status, 401);
    });

    it("case2", async () => {
      const res = await supertest(app).get("/secret3").auth("cafe", "babe");
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { status: "success", data: "3terces" });
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
