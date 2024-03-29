const mongoose = require('mongoose')
const env = require('dotenv').config()
mongoose.connect(
  `${process.env.DB_CONNECTION}:
  {
    authSource: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  },
  err => {
    if (err) throw err
    console.log('DB Connected Successfully')
  }
)
