const authUser = require('../middleware/authUser')
const userController = require('../controllers/userController')
const conversationController = require('../controllers/conversationController')
const express = require('express'),
  app = express.Router()
app.post('/store', authUser, conversationController.store)
app.get('/', authUser, conversationController.index)
app.get('/:id', authUser, conversationController.show)
module.exports = app
