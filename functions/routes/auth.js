const { Router } = require("express");
const { signup, signin } = require("../controller/user");

let routerAuth = Router();
routerAuth.post("/signup", signup);
routerAuth.post("/signin", signin);

module.exports = routerAuth;
