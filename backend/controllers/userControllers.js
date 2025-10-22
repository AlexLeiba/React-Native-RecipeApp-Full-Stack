function getAllUsersController(req, res) {
  console.log("Reached", req.user);

  res.status(200).json({ message: "yes" });
}

function getUserController(req, res) {}

function editUserController(req, res) {}

function deteleUserController(req, res) {}

module.exports = {
  getAllUsersController,
  getUserController,
  editUserController,
  deteleUserController,
};
