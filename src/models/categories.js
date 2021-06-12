const db = require("../helpers/database");

exports.getCate = (cb) => {
  db.query(`SELECT category.id, category.name, category.created_at, category.updated_at FROM category`, cb);
};

exports.getCateById = (id, cb) => {
  db.query(`SELECT category.id, category.name, category.created_at, category.updated_at FROM category WHERE id=${id}`, cb);
};

exports.insertCate = (data, cb) => {
  db.query(`INSERT INTO category (name) VALUES('${data}')`, cb);
};

exports.updateCatePartial = (data, cb) => {
  const key = Object.keys(data);
  const keyLength = key.length;
  const columnCate = key[keyLength - 1];
  db.query(`UPDATE category SET ${columnCate}=? WHERE id=?`, [data[columnCate], data.id], cb);
};

exports.updateCate = (data, cb) => {
  db.query(`UPDATE category SET name=? WHERE id=?`, [data.name, data.id], cb);
};

exports.deleteCate = (id, cb) => {
  db.query(`DELETE FROM category WHERE id=?`, [id], cb);
};
