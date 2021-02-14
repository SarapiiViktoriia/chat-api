const Message = require('../models/messageModel')
exports.sendMessage = async (req, res) => {
  var message = new Message(req.body)
  message.save(err => {
    if (err) sendStatus(500)
    global.io.emit('message', req.body)
    res.sendStatus(200)
  })
}
exports.fetchMessage = async (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages)
  })
}
