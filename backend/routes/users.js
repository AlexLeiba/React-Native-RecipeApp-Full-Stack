const express = require("express");
const verifyRolesPermissions = require("../config/middleware/verifyRolePermissions");
const ROLES = require("../config/roles");

const {
  getAllUsersController,
  getUserController,
  editUserController,
  deteleUserController,
} = require("../controllers/userControllers");

const router = express.Router();

router.get(
  "/users",
  verifyRolesPermissions([ROLES.user, ROLES.admin, ROLES.editor]),
  getAllUsersController
);

router.get(
  "/users/:id",
  verifyRolesPermissions([ROLES.user, ROLES.admin, ROLES.editor]),
  getUserController
);

router.post(
  "/users/:id",
  verifyRolesPermissions([ROLES.user, ROLES.admin, ROLES.editor]),
  editUserController
);

router.delete(
  "/users/:id",
  verifyRolesPermissions([ROLES.user, ROLES.admin]),
  deteleUserController
);

module.exports = router;
