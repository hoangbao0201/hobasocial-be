const express = require("express");
const router = express.Router();

// Controller
const MessageController = require("../controllers/MessageController");

// Middleware
const verifyToken = require("../middleware/verifyToken");


router.put("/all-message", verifyToken, MessageController.allMessage);
router.put("/send-message", verifyToken, MessageController.sendMessage);
router.put("/user-message/:id", verifyToken, MessageController.userMessage);




module.exports = router;