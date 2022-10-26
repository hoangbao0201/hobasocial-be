const authRouter = require("./auth");
const postRouter = require("./post");
const adminRouter = require("./admin");
const messageRouter = require("./message");

function route(app) {

    app.use("/api/auth", authRouter);
    app.use("/api/post", postRouter);
    app.use("/api/message", messageRouter);

    // admin
    app.use("/api/admin", adminRouter);

}

module.exports = route;