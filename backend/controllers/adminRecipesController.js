const RecipeModel = require("../model/recipe");
const UserModel = require("../model/user");
const ActivitiesModel = require("../model/activities");
async function getSearchRecipesController(req, res) {
  if (!req.user) {
    res.status(403).json({ message: "Forbidden" });
  }
  const userEmail = req.user.email;
  if (!userEmail) {
    res.status(403).json({ message: "Forbidden" });
  }

  try {
    const foundUser = await UserModel.findOne({ email: userEmail });

    if (!foundUser) {
      res.status(400).json({ message: "User not found" });
    }

    const foundRecipes = await RecipeModel.find();

    res.status(200).json({ data: foundRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getRecipesController(req, res) {
  if (!req.user) {
    res.status(403).json({ message: "Forbidden" });
  }
  const userEmail = req.user.email;
  if (!userEmail) {
    res.status(403).json({ message: "Forbidden" });
  }

  try {
    const foundUser = await UserModel.findOne({ email: userEmail });

    if (!foundUser) {
      res.status(400).json({ message: "User not found" });
    }

    const foundRecipes = await RecipeModel.find();

    res.status(200).json({ data: foundRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getRecipeController(req, res) {
  if (!req.user) {
    res.status(403).json({ message: "Forbidden" });
  }
  const userEmail = req.user.email;
  if (!userEmail) {
    res.status(403).json({ message: "Forbidden" });
  }
  const recipeId = req.params.id;

  if (!recipeId) {
    res.status(400).json({ message: "Bad request" });
  }

  try {
    const foundRecipe = await RecipeModel.find({
      _id: recipeId,
    });

    if (!foundRecipe) {
      res.status(400).json({ message: "Recipe not found" });
    }

    res.status(200).json({ data: foundRecipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function createRecipeController(req, res) {
  if (!req.user) {
    res.status(403).json({ message: "Forbidden" });
  }
  const userEmail = req.user.email;
  if (!userEmail) {
    res.status(403).json({ message: "Forbidden" });
  }
  const recipeBody = req.body;

  if (!recipeBody) {
    res.status(400).json({ message: "Bad request" });
  }

  try {
    const foundUser = await UserModel.findOne({ email: userEmail });

    if (!foundUser) {
      res.status(400).json({ message: "User not found" });
    }

    await RecipeModel.create({ ...recipeBody, userId: foundUser._id });
    await ActivitiesModel.create({
      userId: foundUser._id,
      userEmail: foundUser.email,
      action: "Created a new recipe",
    });

    res.status(201).json({ message: "Recipe was created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateRecipeController(req, res) {
  if (!req.user) {
    res.status(403).json({ message: "Forbidden" });
  }
  const userEmail = req.user.email;
  if (!userEmail) {
    res.status(403).json({ message: "Forbidden" });
  }
  const recipeBody = req.body;
  const recipeId = req.params.id;

  if (!recipeBody || !recipeId) {
    res.status(400).json({ message: "Bad request" });
  }

  try {
    const foundUser = await UserModel.findOne({ email: userEmail });

    if (!foundUser) {
      res.status(400).json({ message: "User not found" });
    }

    await RecipeModel.findOneAndUpdate({ _id: recipeId }, recipeBody);
    await ActivitiesModel.create({
      userId: foundUser._id,
      userEmail: foundUser.email,
      action: "Updated a recipe",
      modifiedElementId: recipeId,
    });

    res.status(201).json({ message: "The recipe was updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteRecipeController(req, res) {
  if (!req.user) {
    res.status(403).json({ message: "Forbidden" });
  }
  const userEmail = req.user.email;
  if (!userEmail) {
    res.status(403).json({ message: "Forbidden" });
  }
  const recipeId = req.params.id;

  if (!recipeId) {
    res.status(400).json({ message: "Bad request" });
  }

  try {
    const foundUser = await UserModel.findOne({ email: userEmail });

    if (!foundUser) {
      res.status(400).json({ message: "User not found" });
    }

    await RecipeModel.findOneAndDelete({
      _id: recipeId,
    });

    await ActivitiesModel.create({
      userId: foundUser._id,
      userEmail: foundUser.email,
      action: "Deleted a recipe",
      modifiedElementId: recipeId,
    });

    res.status(200).json({ message: "The recipe was deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getRecipesController,
  getRecipeController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
  getSearchRecipesController,
};
