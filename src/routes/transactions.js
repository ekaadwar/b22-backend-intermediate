const {
  createTransaction,
  getMyTransaction,
  getMyTransactionDetail,
  deleteMyTransaction,
} = require("../controllers/transactions");

const route = require("express").Router();

route.post("/transaction", createTransaction);
route.get("/mytransaction", getMyTransaction);
route.get("/mytransaction/:id", getMyTransactionDetail);
route.delete("mytransaction/:id", deleteMyTransaction);

module.exports = route;
