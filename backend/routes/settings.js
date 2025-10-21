const express = require("express");

const {
  getSettingsController,
  updateSettingsController,
} = require("../controllers/settingsControllers");

const router = express.Router();

router.get("/get-settings", getSettingsController);
router.put("/update-settings", updateSettingsController);

module.exports = router;
