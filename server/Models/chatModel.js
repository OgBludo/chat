const mongoose = require("mongoose")

const chatModel = mongoose.Schema(
    {
        chatName:
        {
            type: String,
            trim: true,
        },
        isGrChat:
        {
            type: Boolean,
            default: false
        },
        users: 
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",

            },
        ],
        latestMessage:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        isGrAdm:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        },
        {
            timestamps:true,
        });
const Chat = mongoose.model("Chat",chatModel)

module.exports = Chat;