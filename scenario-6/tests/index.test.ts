/// <reference types="@types/jest" />
import path from "path";
import { existsSync, readFileSync, unlinkSync } from "fs";
import request from "supertest";

import api from "../src/api";

describe("api", () => {

    describe("GET /", () => {
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
        });
    });

    describe("POST /uploads", () => {

        afterAll(() => {
            if(existsSync(`uploads/upload.txt`)) {
                unlinkSync(`uploads/upload.txt`);
            }
        });

        it("with a valid payload, should return a 201 status code and the expected payload", async () => {
            // arrange
            const expected = readFileSync(path.resolve(__dirname, "./fixtures/upload.txt"), "utf-8");
            // act
            const response = await request(api)
                .post("/uploads")
                .attach("item_file", path.resolve(__dirname, "./fixtures/upload.txt"));
            // assert
            expect(response.status).toBe(201);
            expect(response.body.msg).toBe(`file has been uploaded @ uploads/upload.txt`);
            expect(response.body.data).toBeNull();
            expect(readFileSync(`uploads/upload.txt`, "utf-8")).toEqual(expected);
        });
 
    });

});