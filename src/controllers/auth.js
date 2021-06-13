const { response } = require("../helpers/standardResponse");
const { createUsers } = require(`../models/users`);

exports.register = (req, res) => {
  createUsers(req.body, (error) => {
    if (!error) {
      return response(res, 200, true, "Register successfully!");
    } else {
      console.log(error);
      return response(res, 200, true, "Register successfully!");
    }
  });
};
