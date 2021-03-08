const authUser = require('../middleware/authUser')
const userController = require('../controllers/userController')
const conversationController = require('../controllers/conversationController')
const express = require('express'),
    app = express.Router()
app.post('/store', conversationController.store)
module.exports = app
