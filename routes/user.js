const authUser = require('../middleware/authUser')
const userController = require('../controllers/userController')
const express = require('express'),
  app = express.Router()
app.post('/register', userController.register)
app.post('/login', userController.login)
app.get('/', authUser, userController.index)
app.put('/:id/update', authUser, userController.update)
app.post('/getUser', authUser, userController.getUser)
app.get('/me', authUser, userController.show)
app.post('/me/avatar', authUser, userController.uploadAvatar)
module.exports = app
