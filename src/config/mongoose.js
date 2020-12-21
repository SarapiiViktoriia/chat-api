const mongoose = require('mongoose')
const env = require('dotenv').config()
mongoose.connect(`${process.env.DB_CONNECTION}:
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")
