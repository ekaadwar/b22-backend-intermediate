const route = require("express").Router();
const { register } = require("../controllers/auth");

route.post("/register", register);

module.exports = route;
