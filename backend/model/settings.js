const mongoose = require("mongoose");
//Will be created when user Sign up
const SettingsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  notifications: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    default: "english",
  },
});

const SettingsModel = mongoose.model("Settings", SettingsSchema);

module.exports = SettingsModel;
