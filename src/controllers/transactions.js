const { response } = require("../helpers/standardResponse");
const { codeTransaction } = require("../helpers/transactions");
const { APP_TRANSACTION_PREFIX } = process.env;
const { getItemsById } = require("../models/items");
const modelTrans = require("../models/transactions");

exports.createTransaction = (req, res) => {
  // const code = codeTransaction(APP_TRANSACTION_PREFIX, 0);
  const data = req.body;

  if (typeof data.item_id === "string") {
    data.items_id = [data.items_id];
    data.items_amount = [data.items_amount];
  }

  getItemsById(
    data.items_id.map((id) => parseInt(id)),
    (error, results) => {
      if (!error) {
        const code = codeTransaction(APP_TRANSACTION_PREFIX, 1);

        const total = results
          .map((item, index) => item.price * data.items_amount[index])
          .reduce((acc, curr) => acc + curr);

        const tax = (total * 10) / 100;
        const shippingCost = 10000;
        const paymentMethod = data.payment_method;
        const idUser = req.authUser.id;

        const dataTrans = {
          code,
          total,
          tax,
          shipping_cost: shippingCost,
          payment_method: paymentMethod,
          id_user: idUser,
        };

        modelTrans.createTransactions(dataTrans, (error, results) => {
          if (!error) {
            return response(res, 200, true, results);
          } else {
            return response(res, 500, false, "Data transfer failed!");
          }
        });
      } else {
        console.log(error);
        return response(res, 500, false, "An error occured!");
      }
    }
  );

  // return response(res, 200, true, "OK");
};
