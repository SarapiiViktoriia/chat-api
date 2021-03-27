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
const Message = require('./models/messageModel')
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
        socket.broadcast.emit('userJoined', user);
        console.log(user + " joined");
    });
    socket.on('newMessage', (sender, content, conversationId) => {
        io.emit('newMessage', {
            sender: sender,
            content: content,
            conversationId: conversationId
        })
        console.log("New message from " + sender + " : " + content)
    })
    socket.on('disconnect', (user) => {
        console.log(`Socket ${socket.id} disconnected.`);
    });
})
const port = 3001
server.listen(port, () => {
    console.log('server is running on port', port);
});
