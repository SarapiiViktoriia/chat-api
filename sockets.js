const mongoose = require('./config/mongoose')
var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
global.io = io;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
const messageRouter = require('./routes/message')(app)
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
})
const port = 3001
server.listen(port, () => {
    console.log('server is running on port', port);
});
