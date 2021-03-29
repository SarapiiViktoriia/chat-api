const Message = require('../models/messageModel')
exports.sendMessage = async (req, res) => {
  try {
    let message = new Message(req.body)
    await message.save()
    res.status(201).send({
      status: res.statusCode,
      success: true,
      messages: 'New message sent!',
    })
  } catch (e) {
    res.status(400).send({
      status: res.statusCode,
      success: false,
      messages: 'Failed send Message!',
    })
    console.log(e)
  }
}
exports.fetchMessage = async (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages)
  })
}
