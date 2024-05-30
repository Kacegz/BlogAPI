const Comment = require("../models/Comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.list = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postid })
    .populate("author")
    .exec();
  if (comments == null) {
    return res.status(400).json({ error: "No comments found" });
  }
  res.json(comments);
});
exports.create = [
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Text cannot be empty")
    .escape(),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({
        error: "Validation failed",
        message: result.array()[0].msg,
      });
    }
    jwt.verify(req.token, process.env.secretkey, async (err, authData) => {
      if (err) return res.status(403).json({ error: "You must be logged in" });
      const post = Comment.find({
        post: req.params.postid,
        _id: req.params.commentid,
      });
      if (post == null) {
        return res.status(400).json({ error: "Post doesn't exist" });
      }
      const comment = new Comment({
        text: req.body.text,
        author: authData.user._id,
        post: req.params.postid,
      });
      comment.save();
      res.json(comment);
    });
  }),
];
exports.update = [
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Text cannot be empty")
    .escape(),
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({
        error: "Validation failed",
        message: result.array()[0].msg,
      });
    }
    const comment = await Comment.findById(req.params.commentid);
    if (comment == null || comment.post.toString() !== req.params.postid)
      return res.status(400).json({ error: "Comment doesn't exist" });
    jwt.verify(req.token, process.env.secretkey, async (err, authData) => {
      if (err) {
        return res.status(403).json({ error: "You must be logged in" });
      }
      if (!authData.user.admin) {
        return res.status(403).json({ error: "You're not an admin" });
      } else {
        const editedComment = {
          text: req.body.text,
        };
        const updated = await Comment.findOneAndUpdate(
          { _id: req.params.commentid },
          editedComment,
          { new: true }
        );
        res.json({ message: "Comment succesfully updated!", updated });
      }
    });
  }),
];
exports.delete = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentid);
  if (comment == null || comment.post.toString() !== req.params.postid)
    return res.status(400).json({ error: "Comment doesn't exist" });
  jwt.verify(req.token, process.env.secretkey, async (err, authData) => {
    if (err) {
      return res.status(403).json({ error: "You must be logged in" });
    }
    if (!authData.user.admin) {
      return res.status(403).json({ error: "You're not an admin" });
    } else {
      const deleted = await Comment.findByIdAndDelete(req.params.commentid);
      res.json({ message: "Comment deleted" });
    }
  });
});
