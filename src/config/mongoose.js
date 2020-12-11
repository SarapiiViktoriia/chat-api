const mongoose = require('mongoose')
mongoose.connect('mongodb:
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
