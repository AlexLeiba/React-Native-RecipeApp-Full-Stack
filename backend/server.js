require("dotenv").config();
const express = require("express");
const mongoDBConnect = require("./config/mongoDbConnect");
const mongoose = require("mongoose");
const verifyJWT = require("./config/middleware/verifyJWT");
const cors = require("cors");
const { credentials } = require("./config/middleware/credentials");
const cookieParser = require("cookie-parser");
const allowedOriginOptions = require("./config/middleware/allowedOrigins");
const whitelist = require("./config/whiteListOrigins");
console.log("🚀 ~ whitelist:", whitelist);

//routes
const authRoute = require("./routes/auth");
const recipeRoute = require("./routes/recipes");
const categoriesRoute = require("./routes/categories");
const settingsRoute = require("./routes/settings");
const usersRoute = require("./routes/users");
const adminRoutes = require("./routes/admin");

// connect to mongoDB
mongoDBConnect();

const PORT = process.env.PORT || 4100;
const app = express();

app.use(credentials); // Handle the credentials check - before CORS!
// Because when the process will reach Cors , The cors will see that the header Access-Control-Allow-Credentials is equal with empty string

app.use(cors(allowedOriginOptions()));

app.use(cookieParser());

app.use(express.json()); // for parsing application/json / req body to json format
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// use routes
app.use("/api", authRoute); //public routes
app.use("/api", verifyJWT, recipeRoute);
app.use("/api", verifyJWT, categoriesRoute);
app.use("/api", verifyJWT, settingsRoute);
app.use("/api", usersRoute);
app.use("/admin", adminRoutes);

// Error handling
app.use((err, _, res) => {
  if (err) {
    res.status(500).send({ message: "Server error" });
  }
});

// listen when mongoDB is connected
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  // start express server
  app.listen(PORT, () => {
    console.log("Server is running on:", PORT);
  });
});

// require("node:crypto").randomBytes(16).toString("hex");
