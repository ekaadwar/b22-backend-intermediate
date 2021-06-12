const route = require("express").Router();

const method = require("../controllers/categories");

route.post("/", method.insertCate);
route.get("/", method.getCate);
route.get("/:id", method.detailCate);
route.put("/:id", method.updateCate);
route.delete("/:id", method.deleteCate);

module.exports = route;
