const route = require("express").Router();

const controllers = require("../controllers/users");
const auth = require("../middleware/auth");

route.get("/", auth, controllers.getUsers);
route.get("/profil", auth, controllers.getProfil);
route.patch("/", auth, controllers.updateProfilePart);
route.put("/profil", auth, controllers.updateProfil);
route.delete("/:id", auth, controllers.deleteUser);

module.exports = route;
