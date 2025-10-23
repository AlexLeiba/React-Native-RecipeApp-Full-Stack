const express = require("express");

const {
  getRecipesController,
  getRecipeController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
} = require("../controllers/recipesControllers");

const router = express.Router();

router.post("/recipes", createRecipeController);
router.get("/recipes", getRecipesController);
router.get("/recipes/:id", getRecipeController);
router.put("/recipes/:id", updateRecipeController);
router.delete("/recipes/:id", deleteRecipeController);

module.exports = router;
