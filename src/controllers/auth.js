const bcrypt = require("bcrypt");
const { response } = require("../helpers/standardResponse");
const { createUsers } = require(`../models/users`);

exports.register = async (req, res) => {
  const data = req.body;
  data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
  createUsers(data, (error) => {
    if (!error) {
      return response(res, 200, true, "Register successfully!");
    } else {
      console.log(error);
      return response(res, 500, true, "Register failed!");
    }
  });
};
