const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    conversationId: {
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
