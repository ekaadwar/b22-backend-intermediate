const route = require("express").Router();
const { register, login } = require("../controllers/auth");

route.post("/register", register);
route.get("/login", login);

module.exports = route;
