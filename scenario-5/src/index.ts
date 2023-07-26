import express from "express";

const api = express();

api.get("/", (req, res) => {
    res.send("tests are running!");
});

export default api;