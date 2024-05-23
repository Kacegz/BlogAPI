const Comment = require("../models/Comment");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.list = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postid }).exec();
  res.json(comments);
});
exports.create = asyncHandler(async (req, res) => {
  const comment = new Comment({
    text: req.body.text,
    author: new mongoose.Types.ObjectId(), //to change
    post: req.params.postid,
  });
  comment.save();
  res.json(comment);
});
exports.delete = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.commentid);
  res.json("Comment deleted");
});
