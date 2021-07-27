import "mocha";
import * as assert from "assert/strict";
import { Buffer } from "buffer";
import * as supertest from "supertest";
import { app } from "./app";

describe("ex02-promisify-middleware", () => {
  describe("/", () => {
    it("case1", async () => {
      const res = await supertest(app).get("/");
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { status: "success", data: "hello" });
    });
  });

  describe("/base64", () => {
    it("case1", async () => {
      const res = await supertest(app).post("/base64");
      assert.equal(res.status, 400);
      assert.deepEqual(res.body, {
        status: "error",
        message: "File not uploaded",
      });
    });

    it("case2", async () => {
      const buffer = Buffer.from("\x89PNG");
      const res = await supertest(app)
        .post("/base64")
        .attach("file", buffer, { filename: "dummy-filename" });
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, {
        status: "success",
        data: { base64: "wolQTkc=", mimetype: "application/octet-stream" },
      });
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
