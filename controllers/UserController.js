const User = require("../models/User");

const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

class UserController {

    // [GET] /api/auth/check-token
    async checkToken(req, res) {

        try {
            const user = await User.findById(req.userId);
            if(!user) {
                return res.status(400).json({
                    success: false,
                    msg: 'Token error'
                })
            }

            res.json({
                success: true,
                msg: "Token hợp lệ",
                user: user,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Server error'
            })
        }

    }

    // [POST] api/auth/register
    async register(req, res) {
        const { name, username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (user) {
                return res.status(400).json({
                    success: false,
                    msg: "Tài khoản đã tồn tại",
                });
            }

            // Hash password
            const hashPassword = await argon2.hash(password);
            const newUser = new User({
                name: name,
                username: username,
                password: hashPassword,
            });
            await newUser.save();

            // JWT
            const accessToken = await jwt.sign(
                {
                    userId: newUser._id,
                },
                process.env.ACCESS_TOKEN_SETCRET
            );


            // Access
            res.json({
                success: true,
                accessToken: accessToken,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [POST] api/auth/login
    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    msg: "Tài khoản không tồn tại",
                });
            }

            // Hash password
            const passwordValid = await argon2.verify(user.password, password);
            if(!passwordValid) {
                return res.status(400).json({
                    success: false,
                    msg: 'Tài khoản hoặc mật khẩu không đúng'
                })
            }

            // JWT
            const accessToken = await jwt.sign(
                {
                    userId: user._id,
                },
                process.env.ACCESS_TOKEN_SETCRET
            );


            // Access
            res.json({
                success: true,
                accessToken: accessToken,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }
    
}

module.exports = new UserController();
