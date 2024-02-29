const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: [true, "Please provide user name "],
    unique: true
  },
  id: {
    type: Number,
    required: [true, "Please provide user id "],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please provide user email "],
    unique: true
  },
  phone: {
    type: Number,
    required: [true, "Please provide user phone number "],
    unique: true
  },
  authenticationNumber: {
    type: String,
    default: null
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
