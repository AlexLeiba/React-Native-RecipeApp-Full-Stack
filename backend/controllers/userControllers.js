const UserModel = require("../model/user");

async function getSearchAllUsersController(req, res) {
  if (!req.user) return res.status(403).json({ message: "Forbidden" });

  try {
    const usersData = await UserModel.find().select(
      "-password -__v -refreshToken -otp -otpCreatedAt -otpVrified"
    );

    if (!usersData) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ data: usersData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getAllUsersController(req, res) {
  if (!req.user) return res.status(403).json({ message: "Forbidden" });

  try {
    const usersData = await UserModel.find().select(
      "-password -__v -refreshToken -otp -otpCreatedAt -otpVrified"
    );

    if (!usersData) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ data: usersData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserController(req, res) {
  if (!req.user) return res.status(403).json({ message: "Forbidden" });

  const userId = req.params.id;

  if (!userId) return res.status(400).json({ message: "Bad request" });

  try {
    const userData = await UserModel.findById(userId).select(
      "-password -__v -refreshToken -otp -otpCreatedAt -otpVrified"
    );

    if (!userData) return res.status(404).json({ message: "User Not found" });

    res.status(200).json({ data: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function editUserController(req, res) {
  if (!req.user) return res.status(403).json({ message: "Forbidden" });
  const userId = req.params.id;
  const body = req.body;

  if (!userId || !body) return res.status(400).json({ message: "Bad request" });

  try {
    const foundUser = await UserModel.findById(userId).select(
      "-password -__v -refreshToken -otp -otpCreatedAt -otpVrified"
    );

    if (!foundUser) return res.status(404).json({ message: "User Not found" });

    foundUser.roles = body.roles || foundUser.roles;
    foundUser.username = body.username || foundUser.username;
    foundUser.save();

    res.status(200).json({ data: foundUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deteleUserController(req, res) {
  if (!req.user) return res.status(403).json({ message: "Forbidden" });
  const userId = req.params.id;

  if (!userId) return res.status(400).json({ message: "Bad request" });

  try {
    const foundUser = await UserModel.findByIdAndDelete(userId);

    if (!foundUser) return res.status(404).json({ message: "User Not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllUsersController,
  getUserController,
  editUserController,
  deteleUserController,
  getSearchAllUsersController,
};
