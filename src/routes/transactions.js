const { createTransaction } = require("../controllers/transactions");

const route = require("express").Router();

route.post("/transaction", createTransaction);

module.exports = route;
