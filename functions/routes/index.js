const { Router } = require("express");
const routerProduct = require("./product");
const routerCategory = require("./category");
const routerAuth = require("./auth");

const router = Router();

// Thêm các route vào đây
router.use("/product", routerProduct);
router.use("/category", routerCategory);
router.use("/auth", routerAuth);
module.exports = router;
