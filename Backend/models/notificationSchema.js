const mongoose = require("mongoose");

//Define Notification Schema
const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "please provide notification type"],
      enum: {
        values: ["approved", "declined", "account-request", "transfered-in"],
        message: "{VALUE} is not supported as a notification type",
      },
    },
    title: {
      type: String,
      require: [true, "please provide notification title"],
    },
    message: {
      type: String,
      require: [true, "please provide notification message"],
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
    data: [],
  },
  {
    timestamps: true,
  }
);

module.exports = {
  notificationSchema,
};
