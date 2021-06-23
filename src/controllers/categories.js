const modelCate = require("../models/categories");
const { response: standardResponse } = require("../helpers/standardResponse");

exports.insertCate = (req, res) => {
  const { name } = req.body;
  modelCate.insertCate(name, (error) => {
    if (!error) {
      return standardResponse(
        res,
        200,
        true,
        "Data has been inserted succesfully!"
      );
    } else {
      return standardResponse(res, 500, false, "Data insertion has failed!");
    }
  });
};

exports.getCate = (req, res) => {
  modelCate.getCate((error, results) => {
    if (!error) {
      return standardResponse(res, 200, true, "Data read succesfully", results);
    } else {
      return standardResponse(res, 500, false, "Data read has failed!");
    }
  });
};

exports.detailCate = (req, res) => {
  const { id } = req.params;
  modelCate.getCateById(id, (error, results) => {
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
      return standardResponse(res, 500, false, "Data can't read by id!");
    }
  });
};

exports.updateCate = (req, res) => {
  const { id } = req.params;
  modelCate.getCateById(id, (error) => {
    if (!error) {
      const { name } = req.body;
      const dataUpdate = { id, name };
      modelCate.updateCate(dataUpdate, (error) => {
        if (!error) {
          return standardResponse(res, 200, true, "Data has been updated");
        } else {
          console.log(error);
          return standardResponse(res, 500, false, "Data can't update!");
        }
      });
    } else {
      return standardResponse(res, 504, false, "Data not found!");
    }
  });
};

exports.deleteCate = (req, res) => {
  const { id: idString } = req.params;
  const id = parseInt(idString);
  modelCate.getCateById(id, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        modelCate.deleteCate(id, (error) => {
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
