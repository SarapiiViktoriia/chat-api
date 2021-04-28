const authUser = require('../middleware/authUser')
const roomChatController = require('../controllers/groupChatController')
const express = require('express')
const app = express.Router()
app.get('/:id', authUser, roomChatController.show)
app.post('/store', authUser, roomChatController.store)
app.put('/:id/update', authUser, roomChatController.update)
app.delete('/:id/destroy', authUser, roomChatController.destroy)
app.put(
  '/:id/addParticipants',
  authUser,
  roomChatController.storeParticipants
)
module.exports = app
