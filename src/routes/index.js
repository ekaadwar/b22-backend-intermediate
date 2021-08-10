const profileRoute = require("./profile.router");
const rootRouter = require("express").Router();

rootRouter.use("/profile", profileRoute);

module.exports = rootRouter;
