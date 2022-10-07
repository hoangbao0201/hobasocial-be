const User = require("../models/User");

const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

class AdminController {
    async adminCreateUser(req, res) {
        const { name, username, password, start, end } = req.body;
        try {

            // Hash password
            const hashPassword = await argon2.hash(password);
            for(let i=start; i<=end; i++) {
                const newUser = new User({
                    name: name,
                    username: username+i,
                    password: hashPassword,
                });
                await newUser.save();
            }

            // Access
            res.json({
                success: true,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }
}

module.exports = new AdminController();