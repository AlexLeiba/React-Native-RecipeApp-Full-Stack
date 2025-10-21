require("dotenv").config();
const mongoose = require("mongoose");
async function mongoDBConnect() {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECT_URL);
  } catch (error) {
    console.log("MongoDB error:", error.message);
  }
}

module.exports = mongoDBConnect;
