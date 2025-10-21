const express = require("express");

const {
  getRecipesController,
  getRecipeController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
} = require("../controllers/recipesControllers");

const router = express.Router();

router.post("/create-recipe", createRecipeController);
router.get("/get-recipe", getRecipesController);
router.get("/get-recipe/:id", getRecipeController);
router.put("/update-recipe/:id", updateRecipeController);
router.delete("/delete-recipe/:id", deleteRecipeController);

module.exports = router;
