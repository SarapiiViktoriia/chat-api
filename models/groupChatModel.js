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
    },
    userCreated: {
      type: Object,
      required: true,
      trim: true,
    },
    participants: {
      type: Array,
      default: [],
      required: true,
      trim: true,
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
