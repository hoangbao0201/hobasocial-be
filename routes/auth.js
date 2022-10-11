const express = require("express");
const router = express.Router();


// Controller
const AdminController = require("../controllers/AdminController");
const UserController = require("../controllers/UserController");

// Middleware
const verifyToken = require("../middleware/verifyToken");
const multer = require("../middleware/multer");


router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.patch("/update-user", verifyToken, UserController.update);
router.post("/upload-avatar", verifyToken , multer.single("file"), UserController.uploadAvatar);

router.get("/all-user", UserController.getAllUser);
router.get("/search-user/text=:query", UserController.searchUser);
router.get("/check-token", verifyToken, UserController.checkToken);




module.exports = router;