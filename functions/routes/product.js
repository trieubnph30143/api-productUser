const { Router } = require("express");
const {
  addProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
} = require("../controller/product");

let routerProduct = Router();
routerProduct.post("/", addProduct);
routerProduct.put("/:id", updateProduct);
routerProduct.delete("/:id", deleteProduct);
routerProduct.get("/:id", getOneProduct);
routerProduct.get("/", getAllProduct);

module.exports = routerProduct;
