const RecipeModel = require("../model/recipe");
const UserModel = require("../model/user");
async function getSearchRecipesController(req, res) {
  if (!req.user) {
    res.status(403).json({ message: "Forbidden" });
  }
  const userEmail = req.user.email;
  if (!userEmail) {
    res.status(403).json({ message: "Forbidden" });
  }

  const query = req.query;
  console.log("query \n\n\n\n", query);

  try {
    const foundUser = await UserModel.findOne({ email: userEmail });
    const foundAdmin = await UserModel.findOne({
      roles: { user: "user", admin: "admin" },
    });

    if (!foundUser) {
      res.status(400).json({ message: "User not found" });
    }

    const foundRecipes = await RecipeModel.find({ userId: foundUser._id });

    // If admin has recipes return all of them, if not return only user recipes
    if (foundAdmin && foundAdmin._id !== foundUser._id) {
      const foundAdminRecipes = await RecipeModel.find({
        userId: foundAdmin._id,
      });

      if (foundAdminRecipes && foundAdminRecipes.length > 0) {
        return res
          .status(200)
          .json({ data: [...foundRecipes, ...foundAdminRecipes] });
      }
    }

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

  const query = req.query;
  console.log("query \n\n\n\n", query);

  try {
    const foundUser = await UserModel.findOne({ email: userEmail });
    const foundAdmin = await UserModel.findOne({
      roles: { user: "user", admin: "admin" },
    });

    if (!foundUser) {
      res.status(400).json({ message: "User not found" });
    }

    const foundRecipes = await RecipeModel.find({ userId: foundUser._id });

    // If admin has recipes return all of them, if not return only user recipes
    if (foundAdmin && foundAdmin._id !== foundUser._id) {
      const foundAdminRecipes = await RecipeModel.find({
        userId: foundAdmin._id,
      });

      if (foundAdminRecipes && foundAdminRecipes.length > 0) {
        return res
          .status(200)
          .json({ data: [...foundRecipes, ...foundAdminRecipes] });
      }
    }

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

    await RecipeModel.findOneAndUpdate(
      { userId: foundUser._id, _id: recipeId },
      recipeBody
    );

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
      userId: foundUser._id,
      _id: recipeId,
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
