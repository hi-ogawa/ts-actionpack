import "mocha";
import * as assert from "assert/strict";
import * as supertest from "supertest";
import { app } from "./app";

describe("ex00-simple", () => {
  describe("GET /", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/");
      assert.equal(res.status, 200);
      assert.equal(res.text, "Hello");
    });
  });

  describe("GET /:id", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/1234");
      assert.equal(res.status, 200);
      assert.equal(res.text, "Hello: id = 1234");
    });
  });

  describe("POST /:id", () => {
    it("case1", async () => {
      const res = await supertest(app).post("/1234");
      assert.equal(res.status, 200);
    });
  });

  describe("PATCH /:id", () => {
    it("case1", async () => {
      const res = await supertest(app).patch("/1234");
      assert.equal(res.status, 200);
    });
  });

  describe("DELETE /:id", () => {
    it("case1", async () => {
      const res = await supertest(app).delete("/1234");
      assert.equal(res.status, 200);
    });
  });
});
