const express = require("express");

const {
  getCategoriesController,
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getCategoryController,
  getSearchCategoriesController,
} = require("../controllers/categoriesControllers");

const router = express.Router();

router.get("/categories", getCategoriesController);
router.get("/categories/search/:search", getSearchCategoriesController);
router.get("/categories/:id", getCategoryController);
router.post("/categories", createCategoryController);
router.put("/categories/:id", updateCategoryController);
router.delete("/categories/:id", deleteCategoryController);

module.exports = router;
