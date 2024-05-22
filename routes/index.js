const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/posts", postController.list);
router.get("/posts/:postid", postController.detail);
router.post("/posts", postController.create);
router.delete("/posts/:postid", postController.delete);

router.get("/posts/:postid/comments", commentController.list);
router.post("/posts/:postid/comments", commentController.create);
router.delete("/posts/:postid/comments/:commentid", commentController.delete);

router.post("/register", userController.register);
router.post("/log_in", userController.log_in);

module.exports = router;
