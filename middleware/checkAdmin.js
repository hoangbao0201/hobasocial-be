const User = require("../models/User");

const checkAdmin = async (req, res, next) => {
    try {
        // if(req.userId != process.env.ID_ADMIN) {
        //     return res.status(400).json({
        //         success: false,
        //         msg: "You are not admin"
        //     })
        // }

        // return res.json({
        //     userId: req.userId,
        //     adminId: process.env.ID_ADMIN
        // })

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Server error'
        })
    }
}

module.exports = checkAdmin;