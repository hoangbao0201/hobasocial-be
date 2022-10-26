const Message = require("../models/Message");

class MessageController {
    //[PUT] /api/message/all-message
    async allMessage(req, res) {
        try {
            const messages = await Message.find({
                member: { $in: req.userId },
            }).populate("member", "-password");

            res.json({
                success: true,
                messages: messages,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    //[PUT] /api/message/user-message/:id
    async userMessage(req, res) {
        try {
            const messages = await Message.find({
                member: { $all: [req.userId, req.params.id] },
            }).populate("member", "-password");

            res.json({
                success: true,
                messages: messages,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    //[PUT] /api/message/send-message
    async sendMessage(req, res) {
        try {
            const { messageId, receiveId, text, image } = req.body;
            // Check data
            if (!text && !image) {
                return res.status(400).json({
                    success: false,
                    msg: "Text and image is required",
                });
            }
            if (!receiveId) {
                return res.status(400).json({
                    success: false,
                    msg: "Something went wrong!Try again!",
                });
            }

            let data = {
                sendBy: req.userId,
            };
            if (text) {
                data.text = text;
            }
            if (image) {
                data.image = image;
            }

            let message;
            if (!!messageId) {
                message = await Message.findOneAndUpdate(
                    { _id: messageId },
                    {
                        $addToSet: { content: data },
                    },
                    {
                        new: true,
                    }
                );
                // message = "có message"
            } else {
                message = await Message.create({
                    member: [...receiveId, req.userId].sort(),
                    content: data,
                });
                // message = "không có message";
            }

            res.json({
                success: true,
                message: message,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }
}

module.exports = new MessageController();
