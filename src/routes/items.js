const route = require("express").Router();

const method = require("../controllers/items");
const auth = require("../middleware/auth");

route.get("/", method.getItems);
route.get("/:id", auth, method.detailItems);
route.post("/", auth, method.insertItems);
route.patch("/:id", method.updatePartial);
route.put("/:id", method.updateItem);
route.delete("/:id", method.deleteItem);

module.exports = route;
