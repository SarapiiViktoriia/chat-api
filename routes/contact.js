const authUser = require('../middleware/authUser')
const contactController = require('../controllers/contactController')
const express = require('express')
const app = express.Router()
app.get('/me', authUser, contactController.index)
app.post('/me/store', authUser, contactController.store)
app.put('/destroy/:idUser', authUser, contactController.destroy)
module.exports = app
