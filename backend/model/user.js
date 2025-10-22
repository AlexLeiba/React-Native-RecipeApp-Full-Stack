const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: { type: String },
  roles: {
    user: {
      type: String,
      default: "user",
    },
    editor: String,
    admin: String,
  },
  refreshToken: {
    type: String,
  },
  otp: {
    type: Number,
    default: null,
  },
  otpCreatedAt: {
    type: Number,
    default: null,
  },
  otpVrified: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
