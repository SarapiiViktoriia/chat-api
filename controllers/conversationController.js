const Conversation = require('../models/conversationModel')
const User = require('../models/userModel')
exports.store = async (req, res) => {
  try {
    const id = req.user._id,
      username = req.user.username,
      avatar = req.user.avatar
    const conversationData = await Conversation.findOne({
      participants: { _id: req.body._id, username: req.body.username },
    }).countDocuments()
    if (conversationData === 1) {
      res.send({
        status: res.statusCode,
        success: true,
        messages: 'Conversation was available!',
      })
    } else {
      const conversation = new Conversation({
        participants: [
          { _id: id, username: username, avatar: avatar },
          req.body,
        ],
      })
      await conversation.save()
      const userA = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $addToSet: { conversations: conversation._id } },
        { new: true, safe: true, upsert: true }
      )
      const userB = await User.findByIdAndUpdate(
        { _id: req.body._id },
        { $addToSet: { conversations: conversation._id } },
        { new: true, safe: true, upsert: true }
      )
      res.status(201).send({
        status: res.statusCode,
        success: true,
        messages: 'New conversation created!',
      })
    }
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
      'conversations'
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
