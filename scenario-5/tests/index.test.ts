/// <reference types="@types/jest" />
import request from "supertest";

import api from "../src/index";

describe("api", () => {

    it("should return a 200 status code", async () => {
        const response = await request(api).get("/");
        expect(response.status).toBe(200);
    });

});