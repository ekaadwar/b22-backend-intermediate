const route = require("express").Router();

const method = require("../controllers/variants");

route.post("/", method.insertVari);
route.get("/", method.getVari);
route.get("/:id", method.detailVari);
route.put("/:id", method.updateVari);
route.delete("/:id", method.deleteVari);

module.exports = route;
