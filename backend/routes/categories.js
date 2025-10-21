const express = require("express");

const {
  getCategoriesController,
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getCategoryController,
} = require("../controllers/categoriesControllers");

const router = express.Router();

router.post("/create-category", createCategoryController);
router.get("/get-category", getCategoriesController);
router.get("/get-category/:id", getCategoryController);
router.put("/update-category/:id", updateCategoryController);
router.delete("/delete-category/:id", deleteCategoryController);

module.exports = router;
