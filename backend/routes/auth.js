const express = require("express");

const {
  loginController,
  registerController,
  forgotPasswordController,
  checkOTPController,
  newPasswordController,
  refreshTokenController,
  logoutController,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/forgot-password", forgotPasswordController);
router.post("/check-otp", checkOTPController);
router.post("/new-password", newPasswordController);
router.get("/logout", logoutController);

router.get("/refresh-token", refreshTokenController);

module.exports = router;
