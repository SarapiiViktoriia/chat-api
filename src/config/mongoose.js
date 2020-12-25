const mongoose = require('mongoose')
const env = require('dotenv').config()
mongoose.connect(`${process.env.DB_CONNECTION}:
    "auth": process.env.DB_AUTH,
    "user": process.env.DB_USERNAME,
    "pass": process.env.DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, (err) => {
    if (err) throw err;
    console.log("DB Connected Successfully");
});
