const User = require("../models/User");
const Post = require("../models/Post");

const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

class AdminController {
    // [DELETE]
    async deleteBot(req, res) {
        try {
            await User.deleteMany({ name: "BOT" });

            res.json({
                success: true,
                msg: "Xóa thành công",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [POST] /api/admin/create-multiple-user
    async createMultipleUser(req, res) {
        const { name, username, password, start, end } = req.body;
        try {
            // Hash password
            const hashPassword = await argon2.hash(password);
            for (let i = start; i <= end; i++) {
                const newUser = new User({
                    name: name,
                    username: username + i,
                    password: hashPassword,
                    avatar: { url: null },
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

    // [POST] /api/admin/create-multiple-post
    async createMultiplePost(req, res) {
        try {
            const { content, start, end } = req.body;

            for (let i = start; i <= end; i++) {
                const post = new Post({
                    content: content + "-" + i,
                    postedBy: req.userId,
                });
                await post.save();
            }

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
