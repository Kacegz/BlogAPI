const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

exports.log_in = asyncHandler(async (req, res) => {
  const users = await User.find().exec();
  res.json(users);
});
exports.register = asyncHandler(async (req, res, next) => {
  const exists = await User.find({ username: req.body.username });
  if (exists) {
    throw new Error("user already exists");
  }
  bcrypt.hash(req.body.password, 10, async (err, hashed) => {
    if (err) {
      next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hashed,
      admin: false,
    });
    user.save();
    res.json(user);
  });
});
