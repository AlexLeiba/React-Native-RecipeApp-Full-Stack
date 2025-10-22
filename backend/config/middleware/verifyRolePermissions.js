const jwt = require("jsonwebtoken");
require("dotenv").config();
function verifyRolePermissions(permissionOptions) {
  return (req, res, next) => {
    const bearerToken = req.headers.authorization || req.headers.Authorization;
    console.log("🚀 ~ rolePermissions ~ bearerToken:", bearerToken);

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = bearerToken.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: err.message });
      }

      if (permissionOptions) {
        const userRoles = Object.values(decoded.roles);
        console.log("🚀 ~ rolePermissions ~ userRoles:", userRoles);
        const hasPermission = permissionOptions.every((permission) =>
          userRoles.includes(permission)
        );
        console.log("🚀 ~ rolePermissions ~ hasPermission:", hasPermission);
        if (!hasPermission) {
          res.status(403).json({ message: "Forbidden access" });
        }
      }
      req.user = {
        username: decoded.username,
        email: decoded.email,
        roles: decoded.roles,
      };
      next();
    });
  };
}

module.exports = verifyRolePermissions;
