const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
          const payload = { id: user.id, email: user.email };
          const token = jwt.sign(payload, process.env.APP_KEY);
          response(res, 200, true, "Welcome!", { token });
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
