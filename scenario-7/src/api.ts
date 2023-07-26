import express from "express";
import uploadsMiddleware from "./uploadMiddleware";

const api = express();

api.get("/", (req, res) => {
    res.send({
        msg: "tests are running!",
        data: null
    });
});

api.post("/uploads", uploadsMiddleware, (req, res) => {
    res.status(201).json({
        msg: `file has been uploaded @ uploads/${req.file?.originalname}`,
        data: null
    });
});

export default api;