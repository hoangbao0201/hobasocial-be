const Post = require("../models/Post");
const User = require("../models/User");

const checkPost = async (req, res, next) => {
    try {
        // Check post
        let post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(400).json({
                success: false,
                msg: "No posts found!",
            });
        }
        if (post.postedBy != req.userId) {
            return res.status(400).json({
                success: false,
                msg: "Authentication invalid",
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Server error",
        });
    }
};

module.exports = checkPost;
