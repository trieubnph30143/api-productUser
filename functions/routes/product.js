const { Router } = require("express");
const {
  addProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
  getAllCategoryProduct,
  getSearchCategoryProduct,
  getFilterCategoryProduct,
  getSearchDebouceProduct,
} = require("../controller/product");

let routerProduct = Router();
routerProduct.post("/", addProduct);
routerProduct.put("/:id", updateProduct);
routerProduct.delete("/:id", deleteProduct);
routerProduct.get("/detail/:id", getOneProduct);
routerProduct.get("/category/:id", getAllCategoryProduct);
routerProduct.get("/search/:search", getSearchCategoryProduct);
routerProduct.post("/filter", getFilterCategoryProduct);
routerProduct.get("/searchdebouce", getSearchDebouceProduct);
routerProduct.get("/", getAllProduct);

module.exports = routerProduct;
