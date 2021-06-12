const route = require("express").Router();

const method = require("../controllers/Users");

route.get("/", method.getUsers);
route.get("/:id", method.detailUsers);
route.post("/", method.insertUsers);

module.exports = route;
