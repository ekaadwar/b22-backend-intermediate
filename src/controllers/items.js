const modelItems = require("../models/items");
const { getUserRole } = require("../models/users");
const { response: standardResponse } = require("../helpers/standardResponse");
const { APP_URL } = process.env;
const itemPicture = require("../helpers/upload").single("picture");
const fs = require("fs");

exports.insertItems = (req, res) => {
  getUserRole(req.authUser.id, (error, results) => {
    if (!error) {
      if (results[0].role === "admin") {
        itemPicture(req, res, (error) => {
          if (!error) {
            req.body.picture = req.file
              ? `${process.env.APP_UPLOAD_ROUTE}/${req.file.filename}`
              : null;

            modelItems.insertItems(req.body, (error, results) => {
              if (!error) {
                if (results.affectedRows) {
                  return standardResponse(
                    res,
                    200,
                    true,
                    "Data has been inserted succesfully!"
                  );
                } else {
                  return standardResponse(
                    res,
                    400,
                    false,
                    "Failed to created items"
                  );
                }
              } else {
                return standardResponse(
                  res,
                  500,
                  false,
                  "Data insertion has failed!"
                );
              }
            });
          } else {
            console.log("error");
            return standardResponse(res, 500, false, `Error`);
          }
        });
      } else {
        console.log(error);
        return standardResponse(
          res,
          400,
          false,
          "Sorry, you have no authority!"
        );
      }
    } else {
      return standardResponse(res, 404, false, "User not found!");
    }
  });
};

exports.getItems = (req, res) => {
  // const condition = req.query.search;

  const condition = req.query;
  condition.search = condition.search || "";
  condition.sort = condition.sort || {};
  condition.sort.created_at = condition.sort.type || "ASC";
  condition.limit = parseInt(condition.limit) || 8;
  condition.offset = parseInt(condition.offset) || 0;
  condition.page = parseInt(condition.page) || 1;

  condition.offset = condition.page * condition.limit - condition.limit;

  let pageInfo = {};

  modelItems.getItemByCond(condition, (error, results) => {
    if (!error) {
      modelItems.getItemsCount(condition, (error, resultCount) => {
        if (!error) {
          const totalData = resultCount[0].count;
          const totalPage = Math.ceil(totalData / condition.limit);

          pageInfo.totalData = totalData;
          pageInfo.currentPage = condition.page;
          pageInfo.totalPage = totalPage;
          pageInfo.limit = condition.limit;

          pageInfo.nextPage =
            condition.page < totalPage
              ? `${APP_URL}/items/?page=${pageInfo.currentPage + 1}`
              : null;

          pageInfo.prevPage =
            condition.page > 1
              ? `${APP_URL}/items/?page=${pageInfo.currentPage - 1}`
              : null;

          return standardResponse(
            res,
            200,
            true,
            "Search data succesfully",
            results,
            pageInfo
          );
        } else {
          console.log(error);
          return standardResponse(
            res,
            404,
            false,
            `data not found! error : ${error.sqlMessage}`,
            results
          );
        }
      });
    } else {
      console.log(error);
      return standardResponse(
        res,
        404,
        false,
        `an error occured : ${error.sqlMessage}`,
        results
      );
    }
  });
};

exports.detailItems = (req, res) => {
  const { id } = req.params;
  modelItems.getItemById(id, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const item = results[0];
        if (item.picture !== null && !item.picture.startsWith("http")) {
          item.picture = `${process.env.APP_URL}${item.picture}`;
        }

        return standardResponse(
          res,
          200,
          true,
          "Data read successfully by id!",
          item
        );
      } else {
        return standardResponse(res, 404, false, "Data not found!");
      }
    } else {
      console.log(error);
      return standardResponse(
        res,
        500,
        false,
        `Get details item failed. Error: ${error.sqlMessage}`
      );
    }
  });
};

exports.updatePartial = (req, res) => {
  getUserRole(req.authUser.id, (error, results) => {
    if (!error) {
      if (results[0].role === "admin") {
        const { id } = req.params;
        modelItems.getItemById(id, (error, results) => {
          if (!error) {
            if (results.length > 0) {
              itemPicture(req, res, (error) => {
                if (!error) {
                  if (req.file) {
                    const path = `assets${results[0].picture}`;
                    fs.unlink(path, (error) => {
                      if (error) throw error;
                      console.log(`${path} has been deleted`);
                    });
                    req.body.picture = `${process.env.APP_UPLOAD_ROUTE}/${req.file.filename}`;
                  }

                  console.log(req.body.picture);

                  const key = Object.keys(req.body);
                  if (key.length == 1) {
                    const firstColumn = key[0];
                    const dataUpdate = {
                      id,
                      [firstColumn]: req.body[firstColumn],
                    };
                    modelItems.updateItemPartial(dataUpdate, (error) => {
                      if (!error) {
                        return standardResponse(
                          res,
                          200,
                          true,
                          "Data has been updated"
                        );
                      } else {
                        console.log(error);
                        return standardResponse(
                          res,
                          500,
                          false,
                          "Data can't update!"
                        );
                      }
                    });
                  } else {
                    return standardResponse(
                      res,
                      400,
                      false,
                      "data's input must single data"
                    );
                  }
                } else {
                  return standardResponse(
                    res,
                    500,
                    false,
                    "Error occured when uploading file"
                  );
                }
              });
            } else {
              return standardResponse(res, 404, false, "Data not found!");
            }
          } else {
            console.log(error);
            return standardResponse(res, 500, false, "Data can't read by id!");
          }
        });
      } else {
        console.log(results[0].role);
        return standardResponse(res, 400, false, "You have no authority!");
      }
    } else {
      return standardResponse(res, 400, false, "User not found!");
    }
  });
};

exports.updateItem = (req, res) => {
  getUserRole(req.authUser.id, (error, results) => {
    if (!error) {
      if (results[0].role === "admin") {
        const { id } = req.params;
        modelItems.getItemById(id, (error) => {
          if (!error) {
            itemPicture(req, res, (error) => {
              if (!error) {
                const { name, price } = req.body;
                const categoryId = parseInt(req.body.category_id);

                req.body.picture = `${process.env.APP_UPLOAD_ROUTE}/${req.file.filename}`;
                const { picture } = req.body;

                const dataUpdate = { id, picture, name, price, categoryId };

                modelItems.updateItem(dataUpdate, (error) => {
                  if (!error) {
                    return standardResponse(
                      res,
                      200,
                      true,
                      "Data has been updated"
                    );
                  } else {
                    console.log(error);
                    return standardResponse(
                      res,
                      500,
                      false,
                      "Data can't update!"
                    );
                  }
                });
              } else {
                console.log(error);
                return standardResponse(res, 500, false, "Error occured!");
              }
            });
          } else {
            return standardResponse(
              res,
              404,
              false,
              "The data you want to change is not found!"
            );
          }
        });
      } else {
        console.log(results[0].role);
        return standardResponse(res, 400, false, "You have no authority!");
      }
    } else {
      return standardResponse(res, 400, false, "An error occured!");
    }
  });
};

exports.deleteItem = (req, res) => {
  getUserRole(req.authUser.id, (error, results) => {
    if (!error) {
      if (results[0].role === "admin") {
        const { id: idString } = req.params;
        const id = parseInt(idString);
        modelItems.getItemById(id, (error, results) => {
          if (!error) {
            if (results.length > 0) {
              modelItems.deleteItem(id, (error) => {
                if (!error) {
                  return standardResponse(
                    res,
                    200,
                    true,
                    "Data has been deleted"
                  );
                } else {
                  console.log(error);
                  return standardResponse(
                    res,
                    500,
                    false,
                    "Data deletion failed"
                  );
                }
              });
            }
          } else {
            return standardResponse(res, 404, false, "Data not found!");
          }
        });
      } else {
        console.log(results[0].role);
        return standardResponse(res, 400, false, "You have no authority!");
      }
    } else {
      console.log(error);
      return standardResponse(res, 400, false, "An error occured!");
    }
  });
};
