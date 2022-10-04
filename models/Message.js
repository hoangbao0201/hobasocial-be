const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    member: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }      
    ],
    content: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            sendBy: { type: mongoose.Types.ObjectId, ref: "User" }
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model("message", messageSchema);