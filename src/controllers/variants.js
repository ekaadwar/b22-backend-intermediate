const modelVari = require("../models/variants");
const { response: standardResponse } = require("../helpers/standardResponse");

exports.insertVari = (req, res) => {
  const { size } = req.body;
  modelVari.insertVari(size, (error, results, _fields) => {
    if (!error) {
      return standardResponse(res, 200, true, "Data has been inserted succesfully!");
    } else {
      return standardResponse(res, 500, false, "Data insertion has failed!");
    }
  });
};

exports.getVari = (req, res) => {
  modelVari.getVari((error, results, _fields) => {
    if (!error) {
      return standardResponse(res, 200, true, "Data read succesfully", results);
    } else {
      console.log(error);
      return standardResponse(res, 500, false, "Data read has failed!");
    }
  });
};

exports.detailVari = (req, res) => {
  const { id } = req.params;
  modelVari.getVariById(id, (error, results, _fields) => {
    if (!error) {
      return standardResponse(res, 200, true, "Data read successfully by id!", results);
    } else {
      console.log(error);
      return standardResponse(res, 500, false, "Data can't read by id!");
    }
  });
};

exports.updateVari = (req, res) => {
  const { id } = req.params;
  modelVari.getVariById(id, (error, results, _fields) => {
    const { size } = req.body;
    const dataUpdate = { id, size };
    modelVari.updateVari(dataUpdate, (error, results, _fields) => {
      if (!error) {
        return standardResponse(res, 200, true, "Data has been updated");
      } else {
        console.log(error);
        return standardResponse(res, 500, false, "Data can't update!");
      }
    });
  });
};

exports.deleteVari = (req, res) => {
  const { id: idString } = req.params;
  const id = parseInt(idString);
  modelVari.getVariById(id, (error, results, _fields) => {
    if (!error) {
      if (results.length > 0) {
        modelVari.deleteVari(id, (error, results, _fields) => {
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
