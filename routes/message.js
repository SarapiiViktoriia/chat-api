const authUser = require('../middleware/authUser')
const messageController = require('../controllers/messageController')
const express = require('express'),
  app = express.Router()
app.post('/', authUser, messageController.sendMessage)
app.get('/:id', authUser, messageController.fetchMessage)
module.exports = app
