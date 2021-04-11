const authUser = require('../middleware/authUser')
const roomChatController = require('../controllers/groupChatController')
const express = require('express')
const app = express.Router()
app.get('/', authUser, roomChatController.index)
app.post('/store', authUser, roomChatController.store)
app.put('/:id/update', authUser, roomChatController.update)
module.exports = app
