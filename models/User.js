const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  Admin: { type: Boolean, required: true, default: false },
});

exports.User = mongoose.model("User", userSchema);
