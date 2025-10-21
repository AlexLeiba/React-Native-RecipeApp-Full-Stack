require("dotenv").config();
const express = require("express");
const mongoDBConnect = require("./config/mongoDbConnect");
const mongoose = require("mongoose");
//routes
const authRoute = require("./routes/auth");
const recipeRoute = require("./routes/recipes");
const categoriesRoute = require("./routes/categories");
const settingsRoute = require("./routes/settings");

// connect to mongoDB
mongoDBConnect();

const PORT = process.env.PORT || 4100;
const app = express();

app.use(express.json()); // for parsing application/json / req body to json format
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// use routes
app.use("/api", authRoute);
app.use("/api", recipeRoute);
app.use("/api", categoriesRoute);
app.use("/api", settingsRoute);

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
