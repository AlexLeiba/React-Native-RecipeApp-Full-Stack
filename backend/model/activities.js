const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    modifiedElementId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ActivityModel = mongoose.model("Activity", ActivitySchema);

module.exports = ActivityModel;
