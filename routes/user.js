const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

// Middleware
const verifyToken = require("../middleware/verifyToken");


router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.patch("/update-user", verifyToken, UserController.update);

router.get("/check-token", verifyToken, UserController.checkToken);


module.exports = router;