const route = require("express").Router();
const {
  createTransaction,
  getMyTransaction,
  getMyTransactionDetail,
  deleteMyTransaction,
} = require("../controllers/transactions");
const auth = require("../middleware/auth");

route.post("/", auth, createTransaction);
route.get("/mytransaction", auth, getMyTransaction);
route.get("/mytransaction/:id", auth, getMyTransactionDetail);
route.delete("mytransaction/:id", auth, deleteMyTransaction);

module.exports = route;
