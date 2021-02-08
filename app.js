const express = require('express')
const app = express()
const mongoose = require('./config/mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
const userRouter = require('./routes/user')(app)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
})
const port = 6969
app.listen(port, () => {
  console.log(`Server is running in ${port}`)
})
