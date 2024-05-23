const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

exports.login = [
  body("username", "username should be longer than 3 characters")
    .isLength({ min: 3 })
    .escape(),
  body("password", "password should be longer than 3 characters")
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({ error: result.array()[0].msg });
    }
    const user = await User.findOne({ username: req.body.username }).exec();
    if (user !== null) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(403).json({ error: "Wrong password" });
      } else {
        jwt.sign({ user }, process.env.secretkey, (err, token) => {
          res.json({ token });
        });
      }
    }
  }),
];
exports.register = [
  body("username", "username should be longer than 3 characters")
    .isLength({ min: 3 })
    .escape(),
  body("password", "password should be longer than 3 characters")
    .isLength({ min: 3 })
    .escape(),
  body("confirm", "passwords must match").custom((value, { req }) => {
    return value === req.body.password;
  }),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({ error: result.array()[0].msg });
    }
    const exists = await User.find({ username: req.body.username });
    if (exists.length > 0) {
      return res.status(400).json({ error: "User already exists" });
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
  }),
];
