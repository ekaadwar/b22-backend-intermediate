const db = require("../helpers/database");

exports.getCate = (cb) => {
  db.query(
    `SELECT categories.id, categories.name, categories.created_at, categories.updated_at FROM categories`,
    cb
  );
};

exports.getCateById = (id, cb) => {
  db.query(
    `SELECT categories.id, categories.name, categories.created_at, categories.updated_at FROM categories WHERE id=${id}`,
    cb
  );
};

exports.insertCate = (data, cb) => {
  db.query(`INSERT INTO categories (name) VALUES('${data}')`, cb);
};

exports.updateCatePartial = (data, cb) => {
  const key = Object.keys(data);
  const keyLength = key.length;
  const columnCate = key[keyLength - 1];
  db.query(
    `UPDATE categories SET ${columnCate}=? WHERE id=?`,
    [data[columnCate], data.id],
    cb
  );
};

exports.updateCate = (data, cb) => {
  db.query(`UPDATE categories SET name=? WHERE id=?`, [data.name, data.id], cb);
};

exports.deleteCate = (id, cb) => {
  db.query(`DELETE FROM categories WHERE id=?`, [id], cb);
};
