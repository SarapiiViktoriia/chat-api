const GroupChat = require('../models/groupChatModel')
exports.index = async (req, res) => {
  try {
    const groupChat = await GroupChat.find({})
    res.status(200).send({
      status: res.statusCode,
      success: true,
      messages: 'Success load data!',
      groupChat,
    })
  } catch (e) {
    res.status(500).send({
      status: res.statusCode,
      success: false,
      messages: 'Server error!',
    })
  }
}
exports.store = async (req, res) => {
  try {
    const groupChat = new GroupChat(req.body)
    await groupChat.save()
    res.status(201).send({
      status: res.statusCode,
      success: true,
      messages: 'New group created!',
    })
  } catch (e) {
    res.status(500).send({
      status: res.statusCode,
      success: false,
      messages: 'Server error!',
    })
  }
}
