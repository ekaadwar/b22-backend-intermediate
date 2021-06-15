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
