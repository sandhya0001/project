const mongoose = require("mongoose");
const { Event } = require("./eventModel");

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, trim: true },
  mobile: { type: Number },
  otp: {
    code: { type: String },
    validTime: { type: Date },
  },
  password: { type: String },
  profile_pic: { type: String },
  // college: { type: String },
  // registration_no: { type: String },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  invoices: [
    {
      url: { type: String, required: true },
      date: { type: Date, default: Date.now },
    }
  ]
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
