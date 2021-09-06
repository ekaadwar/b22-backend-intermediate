const { response: standardResponse } = require("../helpers/standardResponse");

const modelChats = require("../models/chats");

exports.getChats = (req, res) => {
  modelChats.getAllChats((error, results) => {
    if (!error) {
      return standardResponse(
        res,
        200,
        true,
        "Data read successfully by id!",
        results
      );
    } else {
      console.log(error);
      return standardResponse(res, 500, false, "Data can't be read");
    }
  });
};

exports.addChats = (req, res) => {
  const id_sender = req.authUser.id;
  console.log(id_sender);

  const data = {
    success: true,
    message: "halo World",
  };
  return res.json(data);
};
