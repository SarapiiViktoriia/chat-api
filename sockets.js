const mongoose = require('./config/mongoose')
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
global.io = io;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const messageRouter = require('./routes/message')(app)
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/views/chats.html');
})
io.on('connection', () => {
    console.log('a user is connected')
})
const port = 3001
server.listen(port, () => {
    console.log('server is running on port', port);
});
