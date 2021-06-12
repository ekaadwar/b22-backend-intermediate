const db = require("../helpers/database");

exports.getVari = (cb) => {
  db.query(`SELECT variants.id, variants.size, variants.created_at, variants.updated_at FROM variants`, cb);
};

exports.getVariById = (id, cb) => {
  db.query(`SELECT variants.id, variants.size, variants.created_at, variants.updated_at FROM variants WHERE id=${id}`, cb);
};

exports.insertVari = (data, cb) => {
  db.query(`INSERT INTO variants (size) VALUES('${data}')`, cb);
};

exports.updateVariPartial = (data, cb) => {
  const key = Object.keys(data);
  const keyLength = key.length;
  const columnVari = key[keyLength - 1];
  db.query(`UPDATE variants SET ${columnVari}=? WHERE id=?`, [data[columnVari], data.id], cb);
};

exports.updateVari = (data, cb) => {
  db.query(`UPDATE variants SET size=? WHERE id=?`, [data.size, data.id], cb);
};

exports.deleteVari = (id, cb) => {
  db.query(`DELETE FROM variants WHERE id=?`, [id], cb);
};
