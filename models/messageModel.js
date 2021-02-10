const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const Message = mongoose.model('Message', messageSchema)
module.exports = Message
