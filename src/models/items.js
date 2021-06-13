const db = require("../helpers/database");

exports.getItems = (cb) => {
  db.query(
    `SELECT items.id, items.name, items.price, category.name AS category_name, items.created_at, items.updated_at FROM items LEFT JOIN category ON items.category_id = category.id`,
    cb
  );
};

exports.getItemByCond = (cond, cb) => {
  const orderBy = Object.keys(cond.sort)[0];
  const sort = cond.sort[orderBy];

  db.query(
    `
  SELECT items.id, items.name, items.price, category.name AS category_name, items.created_at, items.updated_at 
  FROM items LEFT JOIN category ON items.category_id = category.id 
  WHERE items.name LIKE '%${cond.search}%' 
  ORDER BY items.${orderBy} ${sort}
  LIMIT ? OFFSET ?`,
    [cond.limit, cond.offset],
    cb
  );
};

exports.getItemsCount = (cond, cb) => {
  db.query(
    `SELECT COUNT (items.id) as count FROM items WHERE items.name LIKE '%${cond.search}%'`,
    cb
  );
};

exports.getItemById = (id, cb) => {
  db.query(
    `SELECT items.id, items.name, items.price, category.name AS category_name, items.created_at, items.updated_at FROM items LEFT JOIN category ON items.category_id = category.id WHERE items.id=${id}`,
    cb
  );
};

exports.insertItems = (data, cb) => {
  db.query(
    `INSERT INTO items (name, price, category_id) VALUES('${data.name}', ${data.price}, ${data.categoryId})`,
    cb
  );
};

exports.updateItemPartial = (data, cb) => {
  const key = Object.keys(data);
  const keyLength = key.length;
  const columnItem = key[keyLength - 1];
  db.query(
    `UPDATE items SET ${columnItem}=? WHERE id=?`,
    [data[columnItem], data.id],
    cb
  );
};

exports.updateItem = (data, cb) => {
  db.query(
    `UPDATE items SET picture=?, name=?, price=? WHERE id=?`,
    [data.picture ? data.picture : null, data.name, data.price, data.id],
    cb
  );
};

exports.deleteItem = (data, cb) => {
  db.query(`DELETE FROM items WHERE id=?`, [data], cb);
};
