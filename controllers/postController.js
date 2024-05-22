const Post = require("../models/Post");
const Comment = require("../models/Comment");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.list = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).exec();
  res.json(posts);
});
exports.detail = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postid).exec();
  res.json(post);
});
exports.create = asyncHandler(async (req, res) => {
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    author: new mongoose.Types.ObjectId(),
    published: false,
  });
  await post.save();
  res.json(post);
});
exports.delete = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.postid);
  await Comment.deleteMany({ post: req.params.postid });
  res.json("Post deleted");
});
