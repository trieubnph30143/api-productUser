const { Router } = require("express");
const {
  signup,
  signin,
  getPagiUser,
  getSearchUser,
  deleteUser,
} = require("../controller/user");

let routerAuth = Router();
routerAuth.post("/signup", signup);
routerAuth.post("/signin", signin);
routerAuth.get("/pagi", getPagiUser);
routerAuth.get("/search/:search", getSearchUser);
routerAuth.delete("/delete/:id", deleteUser);
module.exports = routerAuth;
