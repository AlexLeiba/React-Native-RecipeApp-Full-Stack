const express = require("express");
const router = express.Router();
const verifyRolesPermissions = require("../config/middleware/verifyRolePermissions");
const ROLES = require("../config/roles");

//users
const {
  getAllUsersController,
  getUserController,
  editUserController,
  deteleUserController,
} = require("../controllers/userControllers");

router.get(
  "/users",
  verifyRolesPermissions([ROLES.admin, ROLES.editor]),
  getAllUsersController
);

router.get(
  "/users/:id",
  verifyRolesPermissions([ROLES.admin, ROLES.editor]),
  getUserController
);

router.put(
  "/users/:id",
  verifyRolesPermissions([ROLES.admin, ROLES.editor]),
  editUserController
);

router.delete(
  "/users/:id",
  verifyRolesPermissions([ROLES.admin]),
  deteleUserController
);

//categories
const {
  getCategoriesController,
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getCategoryController,
} = require("../controllers/adminCategoriesController");

router.get(
  "/categories",
  verifyRolesPermissions([ROLES.admin, ROLES.editor]),
  getCategoriesController
);
router.get(
  "/categories/:id",
  verifyRolesPermissions([ROLES.admin, ROLES.editor]),
  getCategoryController
);
router.post(
  "/categories",
  verifyRolesPermissions([ROLES.admin, ROLES.editor]),
  createCategoryController
);
router.put(
  "/categories/:id",
  verifyRolesPermissions([ROLES.admin, ROLES.editor]),
  updateCategoryController
);
router.delete(
  "/categories/:id",
  verifyRolesPermissions([ROLES.admin]),
  deleteCategoryController
);

//recipes
const {
  getRecipesController,
  getRecipeController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
} = require("../controllers/adminRecipesController");

router.get(
  "/recipes",
  verifyRolesPermissions([ROLES.admin, ROLES.editor]),
  getRecipesController
);
router.get(
  "/recipes/:id",
  verifyRolesPermissions([ROLES.admin, ROLES.editor]),
  getRecipeController
);
router.post(
  "/recipes",
  verifyRolesPermissions([ROLES.admin, ROLES.editor]),
  createRecipeController
);
router.put(
  "/recipes/:id",
  verifyRolesPermissions([ROLES.admin, ROLES.editor]),
  updateRecipeController
);
router.delete(
  "/recipes/:id",
  verifyRolesPermissions([ROLES.admin]),
  deleteRecipeController
);

module.exports = router;
