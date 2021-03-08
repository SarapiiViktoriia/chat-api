const authUser = require('../middleware/authUser')
const userController = require('../controllers/userController')
const express = require('express'),
  app = express.Router()
app.post('/register', userController.register)
app.post('/login', userController.login)
app.get('/', authUser, userController.index)
app.put('/:id', authUser, userController.update)
app.post('/getUser', authUser, userController.getUser)
app.post('/:id/storeContact', authUser, userController.storeContact)
app.get('/me', authUser, userController.show)
app.get('/me/contact', authUser, userController.indexContact)
app.post('/me/avatar', authUser, userController.uploadAvatar)
module.exports = app
