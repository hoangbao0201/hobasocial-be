const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        member: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
                require: true,
            },
        ],
        content: [
            {
                text: {
                    type: String
                },
                created: {
                    type: Date,
                    default: Date.now,
                },
                sendBy: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    require: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = new mongoose.model("message", messageSchema);
