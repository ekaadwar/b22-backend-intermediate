const connection = require("../helpers/db");

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
