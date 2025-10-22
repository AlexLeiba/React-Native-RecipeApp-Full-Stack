const express = require("express");

const {
  getAllUsersController,
  getUserController,
  editUserController,
  deteleUserController,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/users", getAllUsersController);

router.get("/users/:id", getUserController);

router.post("/users", editUserController);

router.delete("/users/:id", deteleUserController);

module.exports = router;
