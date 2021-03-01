const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('./config/mongoose')
const bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
const userRouter = require('./routes/user')(app)
const port = 6969
app.listen(port, () => {
  console.log(`Server is running in ${port}`)
})
