const express = require("express");
const router = express.Router();

// controller
const PostController = require("../controllers/PostController");
// middleware
const verifyToken = require("../middleware/verifyToken");
const checkPost = require("../middleware/checkPost");



router.get("/all-post", PostController.getAllPost);

router.post("/create", verifyToken, PostController.createPost);
router.delete("/delete/:id", verifyToken, checkPost, PostController.deletePost);

router.put("/like-post/:id", verifyToken, PostController.likePost);
router.put("/unlike-post/:id", verifyToken, PostController.unlikePost);

router.put("/add-comment/:id", verifyToken, PostController.addComment);
router.put("/remove-comment/:id", verifyToken, PostController.removeComment);

router.get("/total-post", PostController.totalPost);



module.exports = router;