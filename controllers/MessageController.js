const Message = require("../models/Message");

class MessageController {

    async getAllMessage(req, res) {
        try {
            const messages = await Message.find({
                member: { $in: req.userId }
            })

            res.json({
                success: true,
                messages: messages
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Server error'
            })
        }

    }

}

module.exports = new MessageController();