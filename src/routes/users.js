const route = require("express").Router();

const controllers = require("../controllers/Users");
const auth = require("../middleware/auth");

route.get("/", auth, controllers.getUsers);
// route.get("/:id", controllers.detailUsers);
// route.post("/", controllers.insertUsers);
route.delete("/:id", auth, controllers.deleteUser);

module.exports = route;
