const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    req.sendStatus(403);
  }
}

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/posts", postController.list);
router.get("/posts/:postid", postController.detail);
router.post("/posts", verifyToken, postController.create);
router.put("/posts/:postid", verifyToken, postController.update);
router.delete("/posts/:postid", verifyToken, postController.delete);

router.get("/posts/:postid/comments", commentController.list);
router.post("/posts/:postid/comments", verifyToken, commentController.create);
router.delete(
  "/posts/:postid/comments/:commentid",
  verifyToken,
  commentController.delete
);

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
