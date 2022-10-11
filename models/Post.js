const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        content: {
            type: String,
        },
        image: {
            url: { String },
            public_id: String,
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
        comment: [
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
