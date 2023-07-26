import api from "./api";

api.listen(3000, () => {
    console.log("server is running on port 3000");
});