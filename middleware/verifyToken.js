const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(400).json({
            success: false,
            msg: "Access token not found",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SETCRET);

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Invalid token'
        })
    }
};

module.exports = verifyToken;
