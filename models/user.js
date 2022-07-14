const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  email: String,
  pass: String,
});

module.exports = mongoose.model("User", userSchema);