const mongoose = require('./config/mongoose')
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
global.io = io; 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html')
})
const messageRouter = require('./routes/message')(app)
io.on('connection', () => {
    console.log('a user is connected')
})
const port = 3001
server.listen(port, () => {
    console.log('server is running on port', port);
});
