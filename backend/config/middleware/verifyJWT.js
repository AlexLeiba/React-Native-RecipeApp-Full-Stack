const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJWT(req, res, next) {
  const tokenBearer = req.headers.authorization || req.headers.Authorization;

  if (!tokenBearer || !tokenBearer.startsWith("Bearer ")) {
    console.log("doest start");
    res.status(401).json({ message: "Anauthorized" });
  }

  const token = tokenBearer.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Anauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }

    req.user = {
      username: decoded.username,
      email: decoded.email,
      roles: decoded.roles,
    };
    next();
  });
}

module.exports = verifyJWT;
