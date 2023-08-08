const mongoose = require("mongoose");

const fcmSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
    },
  },
  { timestamp: true }
);
const UserIp= mongoose.model("fcm", fcmSchema);
module.exports = UserIp
