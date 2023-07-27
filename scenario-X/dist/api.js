"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadMiddleware_1 = __importDefault(require("./uploadMiddleware"));
const api = (0, express_1.default)();
api.get("/", (req, res) => {
    res.send({
        msg: "tests are running!",
        data: null
    });
});
api.post("/uploads", uploadMiddleware_1.default, (req, res) => {
    var _a;
    res.status(201).json({
        msg: `file has been uploaded @ uploads/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}`,
        data: null
    });
});
exports.default = api;
