const mongoose = require('./config/mongoose')
var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
global.io = io;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
const messageRouter = require('./routes/message')(app)
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/index.html'))
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/login.html'))
})
app.get('/chat/:id', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/chat.html'))
})
io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected.`);
    socket.on('userJoined', (user) => {
        io.emit('userJoined', user);
        console.log(user);
    });
    socket.on('newMessage', (message, username) => {
        io.emit('newMessage', {
            username: username,
            message: message
        })
        console.log("New message from " + username + " : " + message);
    })
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
    });
})
const port = 3001
server.listen(port, () => {
    console.log('server is running on port', port);
});
