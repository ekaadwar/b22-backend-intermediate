const connection = require("../helpers/database");

const table = "users";

exports.createUsers = (data, cb) => {
  connection.query(
    `
    INSERT INTO ${table} (name, email, password)
    VALUES (?, ?, ?)
    `,
    [data.name, data.email, data.password],
    cb
  );
};

exports.getUserByEmail = (email, cb) => {
  connection.query(
    `SELECT id, email, password FROM users WHERE email=?`,
    [email],
    cb
  );
};

exports.getUserRole = (id, cb) => {
  connection.query(`SELECT role FROM ${table} WHERE id=?`, [id], cb);
};

exports.getUsers = (cb) => {
  connection.query(
    `SELECT role, photo, name, email, password FROM ${table}`,
    cb
  );
};
