const express = require('express')
const mongoose = require('./config/mongoose')
const path = require('path')
const routes = express.Router()
const app = express()
const port = 6969
app.use(express.static(__dirname + '/public'))
app.use(express.json())
const userRouter = require('./routes/user')(app)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
})
app.get('/url', function (req, res) {
  res.send({ "message": "This is my url!", "url": { "protocol" : req.protocol, "host" : req.get('host'), "path" : req.originalUrl} })
})
app.listen(port, () => {
  console.log(`Server is running in ${port}`)
})
