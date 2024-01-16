const { Router } = require("express");
const {
  addCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} = require("../controller/category");

let routerCategory = Router();
routerCategory.post("/", addCategory);
routerCategory.put("/:id", updateCategory);
routerCategory.delete("/:id", deleteCategory);
routerCategory.get("/:id", getOneCategory);
routerCategory.get("/", getAllCategory);

module.exports = routerCategory;
