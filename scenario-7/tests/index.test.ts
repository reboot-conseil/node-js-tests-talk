/// <reference types="@types/jest" />
import { existsSync, readFileSync, unlinkSync } from "fs";
import jestTheories from "jest-theories";
import path from "path";
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
            ["uploads/upload.txt"].forEach(f => {
                if(existsSync(f)) {
                    unlinkSync(f);
                }
            });
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

    describe("describe various file uploads", () => {
        afterAll(() => {
            ["uploads/upload.txt", "uploads/kebap.jpg", "uploads/script.py"].forEach(f => {
                if(existsSync(f)) {
                    unlinkSync(f);
                }
            });
        });

        const theories = [
            {input: {encoding: "utf-8", path: "./fixtures/upload.txt"}, expected: readFileSync("uploads/upload.txt", "utf-8")},
            {input: {encoding: "base64", path: "./fixtures/kebap.jpg"}, expected: readFileSync("uploads/kebap.jpg", "base64")},
            {input: {encoding: "utf-8", path: "./fixtures/script.py"}, expected: readFileSync("uploads/script.py", "utf-8")}
        ];
        jestTheories("with various uploads of various types, should return a 201 status code and the expected payload each time", theories, async (theory) => {
            // arrange
            const expected = theory.expected;
            // act
            const response = await request(api)
                .post("/uploads")
                .attach("item_file", path.resolve(__dirname, theory.input.path));
            // assert
            expect(response.status).toBe(201);
            expect(response.body.msg).toBe(`file has been uploaded @ uploads/${path.basename(theory.input.path)}`);
            expect(response.body.data).toBeNull();
            expect(readFileSync(`uploads/${path.basename(theory.input.path)}`, theory.input.encoding as any)).toEqual(expected);
        });
    });

});