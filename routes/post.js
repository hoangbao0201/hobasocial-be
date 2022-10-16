const express = require("express");
const router = express.Router();

// controller
const PostController = require("../controllers/PostController");
// middleware
const verifyToken = require("../middleware/verifyToken");
const checkPost = require("../middleware/checkPost");
const multer = require("../middleware/multer");




router.get("/all-post", PostController.getAllPost);

router.post("/create-post", verifyToken, PostController.createPost);
router.delete("/delete-post/:id", verifyToken, checkPost, PostController.deletePost);

router.put("/like-post/:id", verifyToken, PostController.likePost);
router.put("/unlike-post/:id", verifyToken, PostController.unlikePost);

router.put("/add-comment", verifyToken, PostController.addComment);
router.put("/remove-comment", verifyToken, PostController.removeComment);

router.post("/upload-single-image", verifyToken, multer.single("file"), PostController.uploadSingleImage)

router.get("/total-post", PostController.totalPost);



module.exports = router;