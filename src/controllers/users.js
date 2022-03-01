const { response: standardResponse } = require("../helpers/standardResponse");
const modelUsers = require("../models/users");
const { getUserRole } = require("../models/users");
const { APP_URL } = process.env;

exports.getUsers = (req, res) => {
  getUserRole(req.authUser.id, (error, results) => {
    if (!error) {
      if (results[0].role === "admin") {
        const condition = req.query;
        condition.search = condition.search || "";
        condition.sort = condition.sort || {};
        condition.sort.display_name = condition.sort.display_name || "ASC";
        condition.limit = parseInt(condition.limit) || 5;
        condition.offset = parseInt(condition.offset) || 0;
        condition.page = parseInt(condition.page) || 1;

        condition.offset = condition.page * condition.limit - condition.limit;

        let pageInfo = {};

        modelUsers.getUsersByCond(condition, (error, resultUser) => {
          if (!error) {
            modelUsers.getUsersCount(condition, (error, resultCount) => {
              if (!error) {
                const totalData = resultCount[0].count;
                const lastPage = Math.ceil(totalData / condition.limit);

                pageInfo.totalData = totalData;
                pageInfo.currentPage = condition.page;
                pageInfo.lastPage = lastPage;
                pageInfo.limit = condition.limit;
                pageInfo.nextPage =
                  condition.page < lastPage
                    ? `${APP_URL}/users/?page=${pageInfo.currentPage + 1}`
                    : null;
                pageInfo.prevPage =
                  condition.page > 1
                    ? `${APP_URL}/users/?page=${pageInfo.currentPage - 1}`
                    : null;
                return standardResponse(
                  res,
                  200,
                  true,
                  "Search data succesfully",
                  resultUser,
                  pageInfo
                );
              } else {
                return standardResponse(
                  res,
                  404,
                  false,
                  "Data not found!",
                  results
                );
              }
            });
          } else {
            return standardResponse(
              res,
              404,
              false,
              "An error occured",
              results
            );
          }
        });
      } else {
        return standardResponse(
          res,
          400,
          false,
          "Sorry, you have no authority!"
        );
      }
    } else {
      return standardResponse(res, 500, false, `Error : ${error.sqlMessage}`);
    }
  });
};

exports.getProfil = (req, res) => {
  modelUsers.getUserById(req.authUser.id, (error, results) => {
    if (!error) {
      return standardResponse(
        res,
        200,
        true,
        "Get Profile successfuly!",
        results[0]
      );
    } else {
      return standardResponse(
        res,
        404,
        false,
        `Data not found! error : ${error.sqlMessage}`
      );
    }
  });
};

exports.updateProfilePart = (req, res) => {
  const { id: idUser } = req.authUser;
  const id = parseInt(idUser);
  const column = Object.keys(req.body);
  const value = Object.values(req.body);
  const countCol = column.length;

  modelUsers.getUserById(id, (error) => {
    if (!error) {
      for (let i = 0; i < countCol; i++) {
        const col = column[i];
        const val = value[i];
        const data = { id, col, val };

        modelUsers.updateProfilePart(data, (errorUpdate) => {
          if (!errorUpdate) {
            console.log(`${col} column has been successfully updated`);
          } else {
            console.log(`${col} column has been failed to update`);
          }
        });
      }

      return standardResponse(
        res,
        200,
        true,
        "the update process has been completed"
      );
    } else {
      return standardResponse(
        res,
        404,
        false,
        `Data not found! error : ${error.sqlMessage}`
      );
    }
  });
};

exports.updateProfil = (req, res) => {
  const { id: idUser } = req.authUser;
  const id = parseInt(idUser);

  modelUsers.getUserById(id, (error) => {
    if (!error) {
      const {
        // photo,
        name,
        mobile_number,
        address,
        first_name,
        last_name,
        gender,
        birth,
      } = req.body;

      const data = {
        id,
        // photo,
        name,
        mobile_number,
        address,
        first_name,
        last_name,
        gender,
        birth,
      };

      modelUsers.updateProfil(data, (error) => {
        if (!error) {
          return standardResponse(res, 200, true, "Data updating successful!");
        } else {
          let message = "Data failed to update!";
          if (!data.mobile_number) {
            message = "Mobile number column cannot be empty";
          }
          return standardResponse(res, 400, false, message);
        }
      });
    } else {
      return standardResponse(res, 404, false, "Data not found!");
    }
  });
};

exports.deleteUser = (req, res) => {
  getUserRole(req.authUser.id, (error, results) => {
    if (!error) {
      if (results[0].role === "admin") {
        const { id: idString } = req.params;
        const id = parseInt(idString);
        modelUsers.getUserById(id, (error, results) => {
          if (!error) {
            if (results.length > 0) {
              modelUsers.deleteUser(id, (error) => {
                if (!error) {
                  return standardResponse(
                    res,
                    200,
                    true,
                    "Data has been deleted"
                  );
                } else {
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
        return standardResponse(res, 400, false, "You have no authority!");
      }
    } else {
      return standardResponse(res, 400, false, "An error occured!");
    }
  });
};
