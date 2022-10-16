const Post = require("../models/Post");

// Lib
const cloudinary = require("../middleware/cloudinary");

class PostController {


    async uploadSingleImage(req, res) {
        try {
            const image = await cloudinary.uploader.upload(req.file.path ,{
                public_id: `${Date.now()}`,
                resouce_type: "auto",
                folder: "images-post"
            })


            res.json({
                success: true,
                urlImage: image.url,
                idImage: image.public_id,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Server error'
            })
        }
    }

    // [GET] /api/post/all-post?page=page&perpage=perpage
    async getAllPost(req, res) {
        try {
            const { page, perpage } = req.query;

            const post = await Post.find({})
                .populate("postedBy", "-password")
                .limit(perpage)
                .skip((page-1)*perpage)
                .sort({ createdAt: -1 });

            res.json({
                success: true,
                posts: post,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [POST] /api/post/create
    async createPost(req, res) {
        try {
            const { content, image } = req.body;
            if (!content && !image) {
                return res.status(400).json({
                    success: false,
                    msg: "Content and image is required",
                });
            }
            const post = await Post.create({
                content: content,
                image: {
                    url: image.url,
                    public_id: image.public_id
                },
                postedBy: req.userId,
            });

            const postWidthUser = await Post.findById(post._id).populate(
                "postedBy",
                "-password"
            );

            res.json({
                success: true,
                post: postWidthUser,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [DELETE] /api/post/delete/:id
    async deletePost(req, res) {
        try {
            // Action delete post
            const postId = req.params.id
            const post = await Post.findByIdAndDelete(postId);

            res.json({
                success: true,
                msg: "Xóa bài viết thành công",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [PUT] /api/post/like-post/:id
    async likePost(req, res) {
        try {
            // Action like post
            const post = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: { likes: req.userId },
                },
                { new: true }
            );

            res.json({
                success: true,
                post: post,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [PUT] /api/post/unlike-post/:id
    async unlikePost(req, res) {
        try {
            // Action unlike post
            const post = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { likes: { $eq: req.userId } },
                },
                { new: true }
            );

            res.json({
                success: true,
                post: post,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [PUT] /api/post/add-comment/:id
    async addComment(req, res) {
        try {
            // Action comment post
            const { text, postId } = req.body;
            const postComment = await Post.findByIdAndUpdate(
                postId,
                {
                    $push: {
                        comment: {
                            text: text,
                            commentBy: req.userId,
                        },
                    },
                },
                { new: true }
            );

            res.json({
                success: true,
                post: postComment,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [PUT] /api/post/remove-comment/:id
    async removeComment(req, res) {
        try {
            // Action unlike post
            const { commentId, postId } = req.body;
            const post = await Post.findByIdAndUpdate(
                postId,
                {
                    $pull: {
                        comment: {
                            _id: { $eq: commentId },
                        },
                    },
                },
                { new: true }
            );

            res.json({
                success: true,
                post: post,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [GET] /api/post/total-post
    async totalPost(req, res) {
        try {
            const totalPost = await Post.find({}).count();

            res.json({
                success: true,
                totalPost: totalPost,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }
}

module.exports = new PostController();
