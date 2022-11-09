const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        content: {
            type: String,
        },
        image: {
            url: { type: String, require: true},
            public_id: { type: String },
        },
        postedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            require: true,
        },
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User" 
            }
        ],
        comments: [
            {
                text: String,
                created: {
                    type: Date,
                    default: Date.now,
                },
                commentBy: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = new mongoose.model("Post", PostSchema);
