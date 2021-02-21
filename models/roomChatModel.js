const mongoose = require('mongoose')
const roomChatSchema = new mongoose.Schema(
  {
    roomname: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)
const roomChat = mongoose.model('roomChat', roomChatSchema)
module.exports = roomChat
