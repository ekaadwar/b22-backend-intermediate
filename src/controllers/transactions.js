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
