const { Router } = require("express");
const {
  addCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
  getPagiCategory,
  getSearchCategory,
} = require("../controller/category");

let routerCategory = Router();
routerCategory.post("/", addCategory);
routerCategory.put("/:id", updateCategory);
routerCategory.delete("/:id", deleteCategory);
routerCategory.get("/detail/:id", getOneCategory);
routerCategory.get("/", getAllCategory);
routerCategory.get("/pagi", getPagiCategory);
routerCategory.get("/search/:search", getSearchCategory);

module.exports = routerCategory;
