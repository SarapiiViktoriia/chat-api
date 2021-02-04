const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')
const path = require('path')
const app = express()
const port = 6969
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
})
const userRouter = require('./routes/user')(app)
app.listen(port, () => {
  console.log(`Server is running in ${port}`)
})
