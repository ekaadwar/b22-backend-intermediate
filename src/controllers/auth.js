const bcrypt = require("bcrypt");
const { response } = require("../helpers/standardResponse");
const modelUsers = require(`../models/users`);

exports.register = async (req, res) => {
  const data = req.body;
  data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
  modelUsers.createUsers(data, (error) => {
    if (!error) {
      return response(res, 200, true, "Register successfully!");
    } else {
      console.log(error);
      return response(res, 500, true, "Register failed!");
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  modelUsers.getUserByEmail(email, async (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const user = results[0];
        const compare = await bcrypt.compare(password, user.password);
        if (compare) {
          response(res, 200, true, "Welcome!", results);
        } else {
          response(res, 404, false, "Email or Password is wrong!");
        }
      } else {
        console.log(error);
        response(res, 404, false, "Email not found!");
      }
    } else {
      console.log(error);
      response(res, 400, false, "An error occured");
    }
  });
};
