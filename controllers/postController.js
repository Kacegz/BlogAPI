const Post = require("../models/Post");
const Comment = require("../models/Comment");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.list = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).exec();
  if (posts === null) {
    return res.status(400).json({ error: "No posts found" });
  }
  res.json(posts);
});
exports.detail = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postid).exec();
  if (post === null) {
    return res.status(400).json({ error: "Post doesn't exist" });
  }
  res.json(post);
});
exports.create = [
  body("title", "title must not be empty").isLength({ min: 1 }).escape(),
  body("text", "text must be longer than 5 characters")
    .isLength({ min: 5 })
    .escape(),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({ error: result.array()[0].msg });
    }
    jwt.verify(req.token, process.env.secretkey, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const exists = await Post.findOne({ title: req.body.title });
        if (exists !== null)
          return res.status(400).json({ error: "Post already exist" });
        const post = new Post({
          title: req.body.title,
          text: req.body.text,
          author: authData.user._id,
          published: false,
        });
        await post.save();
        res.json(post);
      }
    });
  }),
];
exports.delete = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postid);
  if (post === null)
    return res.status(400).json({ error: "Post doesn't exist" });
  await Post.findByIdAndDelete(req.params.postid);
  await Comment.deleteMany({ post: req.params.postid });
  res.json("Post deleted");
});
