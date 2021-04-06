const mongoose = require('mongoose')
const groupChatSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    participants: {
      type: Array,
      default: [],
    },
    avatar: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)
const groupChat = mongoose.model('groupChat', groupChatSchema)
module.exports = groupChat
