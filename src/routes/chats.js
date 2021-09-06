const route = require("express").Router();

const { getChats, addChats } = require("../controllers/chats");

route.get("/", getChats);
route.post("/add", addChats);

module.exports = route;
