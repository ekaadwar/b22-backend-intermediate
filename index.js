require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8080;

const { APP_UPLOAD_ROUTE, APP_UPLOAD_PATH } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// const whiteList = ["http://localhost:3000", "http://localhost:3001"];
// app.use(cors(whiteList));
app.use(APP_UPLOAD_ROUTE, express.static(APP_UPLOAD_PATH));

app.get("/", (req, res) => {
  const data = {
    success: true,
    message: "halo World",
  };
  return res.json(data);
});

const routeItems = require("./src/routes/items");
const routeCate = require("./src/routes/categories");
const routeVari = require("./src/routes/variants");
const routeAuth = require("./src/routes/auth");
const routeUsers = require("./src/routes/users");
const routeTransactions = require("./src/routes/transactions");
const routeChats = require("./src/routes/chats");

const auth = require("./src/middleware/auth");

app.use("/items", routeItems);
app.use("/categories", routeCate);
app.use("/variants", routeVari);
app.use("/auth", routeAuth);
app.use("/users", routeUsers);
app.use("/private", auth, routeTransactions);
app.use("/chats", routeChats);

app.listen(port, () => {
  console.log("App running ini port 8080");
});
