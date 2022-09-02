import request from "supertest";
import express from "express";
import router from "../routes.js";

const app = new express();
app.use("/", router);

describe("Testing for route: Fetch Entries", function () {
  it("should fetch all entries", async () => {
    const res = await request(app).get("/fetch");
    expect(res.statusCode).toEqual(200);//expecting to receive status code 200
  });
});
