const userRouter = require("./user");

function route(app) {

    app.use("/api/auth", userRouter);

}

module.exports = route;