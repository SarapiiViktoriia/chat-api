const Conversation = require('../models/conversationsModel')
const User = require('../models/userModel')
exports.store = async (req, res) => {
  try {
    const id = req.user._id,
      username = req.user.username,
      avatar = req.user.avatar
    const conversation = new Conversation({
      participants: [{ _id: id, username: username, avatar: avatar }, req.body],
    })
    await conversation.save()
    const user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $addToSet: { conversations: conversation._id } },
      { new: true, safe: true, upsert: true },
    )
    res.status(201).send({
      status: res.statusCode,
      success: true,
      messages: 'New conversation created!',
      user,
    })
  } catch (error) {
    res.status(400).send({
      status: res.statusCode,
      success: false,
      messages: 'Failed to make conversation!',
    })
    console.log(error)
  }
}
exports.show = async (req, res) => {
  try {
    const conversation = await Conversation.findById({ _id: req.params.id })
    res.status(200).send({
      status: res.statusCode,
      success: true,
      messages: 'Success load data!',
      conversation,
    })
  } catch (e) {
    res.status(500).send({
      status: res.statusCode,
      success: false,
      messages: 'Server error!',
    })
    console.log(e)
  }
}
exports.index = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id }).populate(
      'conversations',
    )
    res.status(200).send({
      status: res.statusCode,
      success: true,
      messages: 'Success load data!',
      conversations: user.conversations,
    })
  } catch (e) {
    res.status(500).send({
      status: res.statusCode,
      success: false,
      messages: 'Server error!',
    })
    console.log(e)
  }
}
