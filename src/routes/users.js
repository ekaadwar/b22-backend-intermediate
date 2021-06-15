const route = require("express").Router();

const controllers = require("../controllers/Users");
const auth = require("../middleware/auth");

route.get("/", auth, controllers.getUsers);
// route.patch("/", auth, controllers.updateUser);
route.delete("/:id", auth, controllers.deleteUser);

module.exports = route;
