const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const conversationSchema = new Schema(
    {
        participants: {
            type: Array
        }
    }
)
const Conversation = mongoose.model('Conversation', conversationSchema) 
module.exports = Conversation 
