import express from "express";

const api = express();

api.get("/", (req, res) => {
    res.send({
        msg: "tests are running!",
        data: null
    });
});

export default api;