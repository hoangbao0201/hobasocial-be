const authRouter = require("./auth");
const postRouter = require("./post");
const adminRouter = require("./admin");

function route(app) {

    app.use("/api/auth", authRouter);
    app.use("/api/post", postRouter);

    // admin
    app.use("/api/admin", adminRouter);

}

module.exports = route;