const { response } = require("../helpers/standardResponse");
const { codeTransaction } = require("../helpers/transactions");
const { APP_TRANSACTION_PREFIX } = process.env;
const { getItemsById } = require("../models/items");
const modelTrans = require("../models/transactions");
const { getUserById } = require("../models/users");

exports.createTransaction = (req, res) => {
  const data = req.body;

  if (typeof data.items_id === "string") {
    data.items_id = [data.items_id];
  }

  if (typeof data.items_amount === "string") {
    data.items_amount = [data.items_amount];
  }

  getItemsById(
    data.items_id.map((id) => parseInt(id)),
    (error, items) => {
      if (!error) {
        const code = codeTransaction(APP_TRANSACTION_PREFIX, 1);

        const total = items
          .map((item, index) => item.price * data.items_amount[index])
          .reduce((acc, curr) => acc + curr);

        const tax = (total * 10) / 100;
        const shippingCost = 10000;
        const paymentMethod = data.payment_method;
        const idUser = req.authUser.id;

        getUserById(idUser, (error, users) => {
          if (!error) {
            const shippingAddress = users[0].address;
            const dataTrans = {
              code,
              total,
              tax,
              shipping_cost: shippingCost,
              shipping_address: shippingAddress,
              payment_method: paymentMethod,
              id_user: idUser,
            };

            modelTrans.createTransactions(dataTrans, (error, results) => {
              if (!error) {
                items.forEach((item, index) => {
                  const finalData = {
                    name: item.name,
                    price: item.price,
                    amount: data.items_amount[index],
                    id_item: item.id,
                    id_transaction: results.insertId,
                  };

                  modelTrans.createItemTransactions(finalData, (error) => {
                    if (!error) {
                      console.log(
                        `Item ${item.id} inserted into items_transaction table`
                      );
                    } else {
                      console.log(error);
                    }
                  });
                });

                return response(
                  res,
                  200,
                  true,
                  "Transaction data has been saved!"
                );
              } else {
                return response(res, 500, false, "Data transfer failed!");
              }
            });
          } else {
            return response(res, 500, false, "Adress not found!");
          }
        });
      } else {
        console.log(error);
        return response(res, 500, false, "An error occured!");
      }
    }
  );
};

exports.getMyTransaction = (req, res) => {
  const { id: idUser } = req.authUser;
  const id = parseInt(idUser);

  modelTrans.getMyTransaction(id, (error, result) => {
    if (!error) {
      if (result.length > 0) {
        return response(res, 200, true, result);
      } else {
        return response(res, 404, false, "data not found");
      }
    } else {
      return response(res, 500, false, "an error occured");
    }
  });
};

exports.getMyTransactionDetail = (req, res) => {
  const { id: idUser } = req.authUser;
  const id = parseInt(idUser);
  const { id: idParams } = req.params;
  const idTransaction = parseInt(idParams);
  const data = { id, idTransaction };

  modelTrans.getMyTransaction(id, (error, result) => {
    if (!error) {
      if (result.length > 0) {
        modelTrans.getMyTransactionDetail(data, (err, results) => {
          if (!error) {
            if (results.length > 0) {
              return response(res, 200, true, results);
            } else {
              return response(res, 500, false, "No details found");
            }
          } else {
            console.log(err);
            return response(
              res,
              500,
              false,
              "an error occured when get transaction details"
            );
          }
        });
      } else {
        return response(res, 404, false, "data not found");
      }
    } else {
      return response(res, 500, false, "an error occured");
    }
  });
};

exports.deleteMyTransaction = (req, res) => {
  const { id: idUserString } = req.authUser;
  const idUser = parseInt(idUserString);
  const { id: idTransString } = req.params;
  const idTrans = parseInt(idTransString);

  const data = { idUser, idTrans };

  modelTrans.deleteMyTransaction(data, (error) => {
    if (!error) {
      modelTrans.deleteItemsTransaction(idTrans, (error) => {
        if (!error) {
          return response(
            res,
            200,
            true,
            "transaction data successfully deleted"
          );
        } else {
          return response(
            res,
            500,
            false,
            "an error occured when deleting items_transaction data"
          );
        }
      });
    } else {
      return response(res, 500, false, "an error occured");
    }
  });
};
