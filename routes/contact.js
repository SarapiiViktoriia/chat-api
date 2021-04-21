const authUser = require('../middleware/authUser')
const contactController = require('../controllers/contactController')
const express = require('express')
const app = express.Router()
app.post('/store', authUser, contactController.store)
app.get('/', authUser, contactController.index)
app.put('/destroy/:idUser', authUser, contactController.destroy)
module.exports = app
