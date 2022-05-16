const connection = require("../helpers/database");

const table = "transactions";

exports.createTransactions = (data, cb) => {
  connection.query(
    `INSERT INTO ${table} (code, total, tax, shipping_cost, shipping_address, payment_method, id_user) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.code,
      data.total,
      data.tax,
      data.shipping_cost,
      data.shipping_address,
      data.payment_method,
      data.id_user,
    ],
    cb
  );
};

exports.createItemTransactions = (data, cb) => {
  connection.query(
    `INSERT INTO items_${table} (name, price, variants, amount, id_item, id_transaction)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.price,
      data.variants,
      data.amount,
      data.id_item,
      data.id_transaction,
    ],
    cb
  );
};
