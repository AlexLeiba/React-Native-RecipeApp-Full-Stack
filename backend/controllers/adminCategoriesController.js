const CategoryModel = require("../model/category");
const RecipeModel = require("../model/recipe");
const UserModel = require("../model/user");
const ActivitiesModel = require("../model/activities");

async function getCategoriesController(req, res) {
  if (!req.user) return res.status(403).json({ message: "Forbidden" });

  const userEmail = req.user.email;
  if (!userEmail) return res.status(403).json({ message: "Forbidden" });

  try {
    const foundCategories = await CategoryModel.find();

    res.status(200).json({ data: foundCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //get all categories based on user id
}
async function getCategoryController(req, res) {
  if (!req.user) return res.status(403).json({ message: "Forbidden" });

  const userEmail = req.user.email;
  if (!userEmail) return res.status(403).json({ message: "Forbidden" });

  const categoryId = req.params.id;
  if (!categoryId) return res.status(400).json({ message: "Bad request" });

  try {
    const foundCategory = await CategoryModel.findOne({
      _id: categoryId,
    });

    res.status(200).json({ data: foundCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //get selected category by id
}

async function createCategoryController(req, res) {
  if (!req.user) return res.status(403).json({ message: "Forbidden" });

  const userEmail = req.user.email;
  if (!userEmail) return res.status(403).json({ message: "Forbidden" });

  const categoryBody = req.body;
  if (!categoryBody) return res.status(400).json({ message: "Bad request" });

  try {
    const foundUser = await UserModel.findOne({ email: userEmail });

    if (!foundUser) return res.status(400).json({ message: "User not found" });

    await CategoryModel.create({ ...categoryBody, userId: foundUser._id });
    await ActivitiesModel.create({
      userId: foundUser._id,
      userEmail: foundUser.email,
      action: "Created a category",
    });

    res.status(201).json({ message: "The category was created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateCategoryController(req, res) {
  if (!req.user) return res.status(403).json({ message: "Forbidden" });

  const userEmail = req.user.email;
  if (!userEmail) return res.status(403).json({ message: "Forbidden" });

  const categoryBody = req.body;
  const categoryId = req.params.id;
  if (!categoryBody || !categoryId) {
    return res.status(400).json({ message: "Bad request" });
  }

  try {
    const foundUser = await UserModel.findOne({ email: userEmail });

    if (!foundUser) return res.status(400).json({ message: "User not found" });

    await CategoryModel.findOneAndUpdate(
      { userId: foundUser._id, _id: categoryId },
      categoryBody
    );

    await ActivitiesModel.create({
      userId: foundUser._id,
      userEmail: foundUser.email,
      action: "Updated a category",
      modifiedElementId: categoryId,
    });

    res.status(200).json({ message: "The category was updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //update category with user id and cat id
}

async function deleteCategoryController(req, res) {
  if (!req.user) return res.status(403).json({ message: "Forbidden" });

  const userEmail = req.user.email;
  if (!userEmail) return res.status(403).json({ message: "Forbidden" });

  const categoryId = req.params.id;
  if (!categoryId) return res.status(400).json({ message: "Bad request" });

  try {
    const foundUser = await UserModel.findOne({ email: userEmail });

    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const foundRecipesWithSelectedCategory = await RecipeModel.find({
      categoryId: categoryId,
    });

    if (
      foundRecipesWithSelectedCategory &&
      foundRecipesWithSelectedCategory.length > 0
    ) {
      return res.status(400).json({
        message: `You still have ${foundRecipesWithSelectedCategory.length} recipes in this category, Please first delete or move all recipes to another category.`,
      });
    }

    await CategoryModel.findOneAndDelete({
      _id: categoryId,
    });

    await ActivitiesModel.create({
      userId: foundUser._id,
      userEmail: foundUser.email,
      action: "Deleted a category",
      modifiedElementId: categoryId,
    });

    res.status(200).json({ message: "The category was deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //delete category with user id and cat id
}

module.exports = {
  getCategoriesController,
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getCategoryController,
};
