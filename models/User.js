const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: { type: String, require: true },
        username: { type: String, require: true },
        password: { type: String, require: true },
        avatar: {
            url: { type: String, require: true},
            public_id: { type: String },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = new mongoose.model("User", UserSchema);
