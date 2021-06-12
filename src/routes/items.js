const route = require("express").Router();

const method = require("../controllers/items");

route.get("/", method.getItems);
route.get("/:id", method.detailItems);
route.post("/", method.insertItems);
route.patch("/:id", method.updatePartial);
route.put("/:id", method.updateItem);
route.delete("/:id", method.deleteItem);

module.exports = route;
