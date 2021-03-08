const mongoose = require('./config/mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
  , app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use('/api/users', require('./routes/user'))
app.use('/api/conversations', require('./routes/conversation'))
const port = 6969
app.listen(port, () => {
  console.log(`Server is running in ${port}`)
})
