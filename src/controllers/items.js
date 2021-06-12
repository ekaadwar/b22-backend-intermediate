const modelItems = require("../models/items");
const { response: standardResponse } = require("../helpers/standardResponse");
const { APP_URL } = process.env;

exports.insertItems = (req, res) => {
  const { name, price, categoryId } = req.body;
  const dataInsert = { name, price, categoryId };
  modelItems.insertItems(dataInsert, (error, results, _fields) => {
    if (!error) {
      return standardResponse(res, 200, true, "Data has been inserted succesfully!");
    } else {
      return standardResponse(res, 500, false, "Data insertion has failed!");
    }
  });
};

exports.getItems = (req, res) => {
  // const condition = req.query.search;
  const sort = req.query.sort;

  const condition = req.query;
  condition.search = condition.search || "";
  condition.sort = condition.sort || {};
  condition.sort.name = condition.sort.name || "ASC";
  condition.limit = parseInt(condition.limit) || 5;
  condition.offset = parseInt(condition.offset) || 0;
  condition.page = parseInt(condition.page) || 1;

  condition.offset = condition.page * condition.limit - condition.limit;

  pageInfo = {};

  modelItems.getItemByCond(condition, (error, results, _fields) => {
    if (!error) {
      modelItems.getItemsCount(condition, (error, resultCount, _fields) => {
        if (!error) {
          const totalData = resultCount[0].count;
          const lastPage = Math.ceil(totalData / condition.limit);

          pageInfo.totalData = totalData;
          pageInfo.currentPage = condition.page;
          pageInfo.lastPage = lastPage;
          pageInfo.limit = condition.limit;
          pageInfo.nextPage = condition.page < lastPage ? `${APP_URL}/items/?page=${pageInfo.currentPage + 1}` : null;
          pageInfo.prevPage = condition.page > 1 ? `${APP_URL}/items/?page=${pageInfo.currentPage - 1}` : null;
          return standardResponse(res, 200, true, "Search data succesfully", results, pageInfo);
        } else {
          console.log(error);
          return standardResponse(res, 404, false, "Data not found!", results);
        }
      });
    } else {
      console.log(error);
      return standardResponse(res, 404, false, "Data not found!", results);
    }
  });
};

exports.detailItems = (req, res) => {
  const { id } = req.params;
  modelItems.getItemById(id, (error, results, _fields) => {
    if (!error) {
      return standardResponse(res, 200, true, "Data read successfully by id!", results);
    } else {
      console.log(error);
      return standardResponse(res, 500, false, "Data can't read by id!");
    }
  });
};

exports.updatePartial = (req, res) => {
  const { id } = req.params;
  modelItems.getItemById(id, (error, results, _fields) => {
    if (!error) {
      if (results.length > 0) {
        const key = Object.keys(req.body);
        if (key.length == 1) {
          const firstColumn = key[0];
          const dataUpdate = { id, [firstColumn]: req.body[firstColumn] };
          modelItems.updateItemPartial(dataUpdate, (error, results, _fields) => {
            if (!error) {
              return standardResponse(res, 200, true, "Data has been updated");
            } else {
              console.log(error);
              return standardResponse(res, 500, false, "Data can't update!");
            }
          });
        } else {
          console.log("data's input must single data");
          return standardResponse(res, 400, false, "data's input must single data");
        }
      } else {
        return standardResponse(res, 404, false, "Data not found!");
      }
    } else {
      console.log(error);
      return standardResponse(res, 500, false, "Data can't read by id!");
    }
  });
};

exports.updateItem = (req, res) => {
  const { id } = req.params;
  modelItems.getItemById(id, (error, results, _fields) => {
    const { name, price } = req.body;
    const dataUpdate = { id, name, price };
    modelItems.updateItem(dataUpdate, (error, results, _fields) => {
      if (!error) {
        return standardResponse(res, 200, true, "Data has been updated");
      } else {
        console.log(error);
        return standardResponse(res, 500, false, "Data can't update!");
      }
    });
  });
};

exports.deleteItem = (req, res) => {
  const { id: idString } = req.params;
  const id = parseInt(idString);
  modelItems.getItemById(id, (error, results, _fields) => {
    if (!error) {
      if (results.length > 0) {
        modelItems.deleteItem(id, (error, results, _fields) => {
          if (!error) {
            return standardResponse(res, 200, true, "Data has been deleted");
          } else {
            console.log(error);
            return standardResponse(res, 500, false, "Data deletion failed");
          }
        });
      }
    }
  });
};
