/// <reference types="@types/jest" />
import request from "supertest";

import api from "../src/api";

describe("api", () => {

    it("should return a 200 status code", async () => {
        const response = await request(api).get("/");
        expect(response.status).toBe(200);
    });

    it("should return the expected response", async () => {
        const response = await request(api).get("/");
        expect(response.body).toEqual({
            msg: "tests are running!",
            data: null
        });
    });

    it("with custom header, should return a 200 status code", async () => {
        const response = await request(api)
            .get("/")
            .set("x-custom-header", "custom header value");
        expect(response.status).toBe(200);
        expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
    });


});