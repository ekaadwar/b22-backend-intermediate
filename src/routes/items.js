const route = require("express").Router();

const method = require("../controllers/items");
const auth = require("../middleware/auth");

route.get("/", method.getItems);
route.get("/:id", method.detailItems);
route.post("/", auth, method.insertItems);
route.patch("/:id", auth, method.updatePartial);
route.put("/:id", auth, method.updateItem);
route.delete("/:id", auth, method.deleteItem);

module.exports = route;
