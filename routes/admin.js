const express = require("express");
const router = express.Router();

// controller
const AdminController = require("../controllers/AdminController");
// middleware
const verifyToken = require("../middleware/verifyToken")
const checkAdmin = require("../middleware/checkAdmin");




// Create multiple post
router.post("/create-multiple-post", verifyToken, checkAdmin, AdminController.createMultiplePost);
// Create multiple user
router.post("/create-multiple-user", verifyToken, checkAdmin, AdminController.createMultipleUser);
// Delete multiple user
router.delete("/delete-multiple-user", verifyToken, checkAdmin, AdminController.deleteBot);




module.exports = router;