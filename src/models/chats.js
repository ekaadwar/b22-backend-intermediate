const db = require("../helpers/database");

exports.getAllChats = (cb) => {
  db.query(
    `SELECT id, id_sender, id_recipient, message, created_at FROM chat`,
    cb
  );
};
