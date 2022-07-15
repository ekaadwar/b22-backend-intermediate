const connection = require("../helpers/database");

const table = "transactions";

exports.getMyTransaction = (id, cb) => {
  connection.query(
    `SELECT id, code, total, tax, shipping_cost, shipping_address, payment_method, created_at, updated_at FROM transactions WHERE id_user=?`,
    [id],
    cb
  );
};

// exports.getMyTransaction = (id, cb) => {
//   connection.query(
//     `SELECT
//       transactions.id AS transactions_id, transactions.code, items.name, items.picture,transactions.total, transactions.total, transactions.tax, transactions.shipping_cost, transactions.shipping_address, transactions.payment_method, transactions.created_at, transactions.updated_at
//     FROM transactions
//     LEFT JOIN items_transactions ON transactions.id = items_transactions.id_transaction
//     LEFT JOIN items ON items_transactions.id_item = items.id
//     WHERE id_user=?`,
//     [id],
//     cb
//   );
// };

exports.getMyTransactionById = (index, cb) => {
  connection.query(
    `SELECT 
      transactions.id AS transactions_id, 
      transactions.code, 
      items.name, 
      items.picture,
      transactions.total, 
      transactions.total, 
      transactions.tax, 
      transactions.shipping_cost, 
      transactions.shipping_address, 
      transactions.payment_method, 
      transactions.created_at, 
      transactions.updated_at 
    FROM transactions 
    LEFT JOIN items_transactions ON transactions.id = items_transactions.id_transaction 
    LEFT JOIN items ON items_transactions.id_item = items.id
    WHERE id_user=? AND transactions.id=?`,
    [index.idUser, index.idTransaction],
    cb
  );
};

exports.getMyTransactionDetail = (data, cb) => {
  connection.query(
    `SELECT items.id, items.name, items.price, items_transactions.amount AS amount, items.picture, items_transactions.created_at, items_transactions.updated_at, transactions.id AS transactions_id, transactions.id_user FROM items_transactions LEFT JOIN items ON items_transactions.id_item = items.id LEFT JOIN transactions ON items_transactions.id_transaction = transactions.id WHERE transactions.id = ? AND transactions.id_user = ?;`,
    [data.idTransaction, data.id],
    cb
  );
};

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

exports.deleteMyTransaction = (data, cb) => {
  connection.query(
    `DELETE FROM ${table} WHERE id=? AND id_user=?`,
    [data.idTrans, data.idUser],
    cb
  );
};

exports.deleteItemTransaction = (id, cb) => {
  connection.query(
    `DELETE FROM items_transactions WHERE id_transaction = ?`,
    [id],
    cb
  );
};
