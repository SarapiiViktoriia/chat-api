const mongoose = require('mongoose')
const timeZone = require('mongoose-timezone')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const groupChatSchema = new Schema(
  {
    avatar: {
      type: String,
      trim: true,
      default: null,
    },
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: 'Awesome group',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
groupChatSchema.plugin(timeZone, { paths: ['timestamps'] }, uniqueValidator)
const GroupChat = mongoose.model('GroupChat', groupChatSchema)
module.exports = GroupChat
