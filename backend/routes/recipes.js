const express = require("express");

const {
  getRecipesController,
  getRecipeController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
  getSearchRecipesController,
} = require("../controllers/recipesControllers");

const router = express.Router();

router.get("/recipes", getRecipesController);
router.get("/recipes/search/:search", getSearchRecipesController);
router.get("/recipes/:id", getRecipeController);
router.post("/recipes", createRecipeController);
router.put("/recipes/:id", updateRecipeController);
router.delete("/recipes/:id", deleteRecipeController);

module.exports = router;
