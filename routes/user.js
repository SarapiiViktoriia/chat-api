const authUser = require('../middleware/authUser')
const userController = require('../controllers/userController')
const express = require('express')
const app = express.Router()
app.post('/register', userController.register)
app.post('/login', userController.login)
app.get('/me', authUser, userController.showUserLogin)
app.put('/me/update', authUser, userController.updateUserLogin)
app.post('/me/avatar', authUser, userController.uploadAvatar)
app.get('/', authUser, userController.index)
app.post('/', authUser, userController.findUsername)
module.exports = app
