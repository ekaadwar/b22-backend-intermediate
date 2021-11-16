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
        condition.sort.name = condition.sort.name || "ASC";
        condition.limit = parseInt(condition.limit) || 5;
        condition.offset = parseInt(condition.offset) || 0;
        condition.page = parseInt(condition.page) || 1;

        condition.offset = condition.page * condition.limit - condition.limit;

        let pageInfo = {};

        modelUsers.getUsersByCond(condition, (error, results) => {
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
                  results,
                  pageInfo
                );
              } else {
                console.log(error);
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
            console.log(error);
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
          400,
          false,
          "Sorry, you have no authority!"
        );
      }
    } else {
      return standardResponse(res, 500, false, "An error occured!");
    }
  });
};

exports.getProfil = (req, res) => {
  modelUsers.getUserById(req.authUser.id, (error, results) => {
    if (!error) {
      // console.log(results);
      return standardResponse(
        res,
        200,
        true,
        "Get Profile successfuly!",
        results[0]
      );
    } else {
      return standardResponse(res, 404, false, "Data not found!");
    }
  });
};

exports.updateProfil = (req, res) => {
  const { id: idUser } = req.authUser;
  const id = parseInt(idUser);

  modelUsers.getUserById(id, (error) => {
    if (!error) {
      // const data = req.body;
      // const column = Object.keys(data);
      // const length = column.length;
      // console.log(length);
      // return standardResponse(res, 200, true, "Okay");

      const {
        photo,
        name,
        name_first,
        name_last,
        email,
        name_shown,
        birth_date,
        gender,
        phone,
        address,
      } = req.body || null;

      const data = {
        id,
        photo,
        name,
        name_first,
        name_last,
        email,
        name_shown,
        birth_date,
        gender,
        phone,
        address,
      };
      modelUsers.updateProfil(data, (error) => {
        if (!error) {
          return standardResponse(res, 200, true, "Data updating successful!");
        } else {
          console.log(error);
          return standardResponse(res, 400, false, "Data failed to update!");
        }
      });
    } else {
      console.log(error);
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
