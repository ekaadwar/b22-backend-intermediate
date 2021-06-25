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

exports.getUserById = (id, cb) => {
  connection.query(
    `SELECT id, photo, name, email, name_shown, name_first, name_last, birth_date, gender, phone, address FROM ${table} WHERE id=${id}`,
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

exports.getUsersByCond = (cond, cb) => {
  const orderBy = Object.keys(cond.sort)[0];
  const sort = cond.sort[orderBy];
  connection.query(
    `
  SELECT role, photo, name, email, password 
  FROM ${table} WHERE ${table}.name LIKE '%${cond.search}%' 
  ORDER BY ${table}.${orderBy} ${sort}
  LIMIT ? OFFSET ?`,
    [cond.limit, cond.offset],
    cb
  );
};

exports.getUsersCount = (cond, cb) => {
  connection.query(
    `SELECT COUNT (${table}.id) as count FROM ${table} WHERE ${table}.name LIKE '%${cond.search}%'`,
    cb
  );
};

exports.updateProfil = (data, cb) => {
  connection.query(
    `UPDATE ${table} SET photo=?, name=?, name_first=?, name_last=?, email=?, name_shown=?, birth_date=?, gender=?, phone=?, address=? WHERE id=?`,
    [
      data.photo,
      data.name,
      data.name_first,
      data.name_last,
      data.email,
      data.name_shown,
      data.birth_date,
      data.gender,
      data.phone,
      data.address,
      data.id,
    ],
    cb
  );
};

exports.deleteUser = (data, cb) => {
  connection.query(`DELETE FROM ${table} WHERE id=?`, [data], cb);
};
