const express = require('express')
const app = express();
const mongoose = require('./config/mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
const port = 3001
const server = app.listen(port, () => {
    console.log('server is running on port', server.address().port);
});
const Message = require('./models/messageModel')
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html')
})
app.post('/api/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);
        res.sendStatus(200);
    })
})
app.get('/api/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})
