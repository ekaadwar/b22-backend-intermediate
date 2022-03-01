const connection = require("../helpers/database");

const table = "users";

exports.createUsers = (data, cb) => {
  connection.query(
    `
    INSERT INTO ${table} (email, password, mobile_number, display_name)
    VALUES (?, ?, ?, ?)
    `,
    [data.email, data.password, data.mobileNumber, data.name],
    cb
  );
};

exports.getUserById = (id, cb) => {
  connection.query(
    `SELECT id, photo, display_name, email, first_name, last_name, birth, gender, mobile_number, address FROM ${table} WHERE id=${id}`,
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
  SELECT role, photo, display_name, email, password 
  FROM ${table} WHERE ${table}.display_name LIKE '%${cond.search}%' 
  ORDER BY ${table}.${orderBy} ${sort}
  LIMIT ? OFFSET ?`,
    [cond.limit, cond.offset],
    cb
  );
  // console.log(connect.sql);
};

exports.getUsersCount = (cond, cb) => {
  connection.query(
    `SELECT COUNT (${table}.id) as count FROM ${table} WHERE ${table}.display_name LIKE '%${cond.search}%'`,
    cb
  );
};

exports.updateProfil = (data, cb) => {
  connection.query(
    `UPDATE ${table} SET display_name=?, mobile_number=?, address=?, first_name=?, last_name=?, gender=?, birth=? WHERE id=?`,
    [
      data.name,
      data.mobile_number,
      data.address,
      data.first_name,
      data.last_name,
      data.gender,
      data.birth,
      data.id,
    ],
    cb
  );
};

exports.updateProfilePart = (data, cb) => {
  const sql = `UPDATE ${table} SET ${data.col}='${data.val}' WHERE id=${data.id}`;

  // console.log(sql);

  connection.query(sql, cb);
};

exports.deleteUser = (data, cb) => {
  connection.query(`DELETE FROM ${table} WHERE id=?`, [data], cb);
};
