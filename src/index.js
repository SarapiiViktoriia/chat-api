const express = require('express')
const bodyParser = require('body-parser')
require('./config/mongoose')
const app = express()
const port = 6969
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World with Express'))
const userRouter = require('./routes/user')(app)
app.use(express.json())
app.listen(port, () => {
  console.log(`Server is running in ${port}`)
})
