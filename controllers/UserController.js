const User = require("../models/User");

const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

//Lib
const cloudinary = require("../middleware/cloudinary");

class UserController {
    // [GET] /api/auth/check-token
    async checkToken(req, res) {
        try {
            const user = await User.findById(req.userId).select("-password");
            if (!user) {
                return res.status(400).json({
                    success: false,
                    msg: "Token error",
                });
            }

            res.json({
                success: true,
                msg: "Token hợp lệ",
                user: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
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

            // // Hash password
            const hashPassword = await argon2.hash(password);
            const newUser = new User({
                name: name,
                username: username,
                password: hashPassword,
                avatar: { url: null }
            });
            await newUser.save();

            // // JWT
            // const accessToken = await jwt.sign(
            //     {
            //         userId: newUser._id,
            //     },
            //     process.env.ACCESS_TOKEN_SETCRET
            // );

            // Access
            res.json({
                success: true,
                // accessToken: accessToken,
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
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    msg: "Tài khoản hoặc mật khẩu không đúng",
                });
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

    //[PATCH] /api/auth/update
    async update(req, res) {
        try {
            const { name, username, password, newPassword } = req.body;

            // Check User
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(500).json({
                    success: false,
                    msg: "Lỗi tài khoản",
                });
            }
            // Check password
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    warningField: ["oldPassword"],
                    msg: "Mật khẩu cũ không đúng",
                });
            }

            // Update user
            const hashPassword = await argon2.hash(newPassword);
            const userUpdated = await User.findByIdAndUpdate(
                req.userId,
                {
                    name: name,
                    username: username,
                    password: hashPassword,
                },
                {
                    new: true,
                }
            );

            res.json({
                success: true,
                msg: "Upload thành công",
                user: userUpdated,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [GET] /api/auth/all-user
    async getAllUser(req, res) {
        try {
            const allUser = await User.find({}).select("-password");
            if (!allUser) {
                return res.status(400).json({
                    success: false,
                    msg: "Server error",
                });
            }
            res.json({
                success: true,
                msg: "Get all user",
                allUser: allUser,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [GET] /api/auth/search-user/text=:query
    async searchUser(req, res) {
        try {
            const { query } = req.params;
            const resultSearch = await User.find({
                $or: [
                    {
                        name: { $regex: query, $options: "i" },
                    },
                ],
            });

            res.json({
                success: true,
                msg: "Search success",
                resultSearch: resultSearch,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [POST] /api/auth/upload-avatar
    async uploadAvatar(req, res) {
        try {
            const user = await User.findById(req.userId);
            if (user.avatar.url) {
                await cloudinary.uploader.destroy(user.avatar.public_id);
            }

            const avatar = await cloudinary.uploader.upload(req.file.path, {
                public_id: `${Date.now()}`,
                resource_type: "auto",
                folder: "avatar",
            });

            await User.updateOne({ _id: req.userId }, {
                avatar: {
                    url: avatar.url,
                    public_id: avatar.public_id,
                }
            }, { new: true });

            res.json({
                success: true,
                user: user,
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
