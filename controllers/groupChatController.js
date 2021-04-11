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
    const id = req.user._id,
      username = req.user.username,
      avatar = req.user.avatar
    const userCreated = { _id: id, username: username, avatar: avatar }
    const participants = req.body.participants
    const participantsData = participants.concat(userCreated)
    const groupChat = new GroupChat({
      userCreated: userCreated,
      participants: participantsData,
      groupName: req.body.groupName,
      desc: req.body.desc,
    })
    await groupChat.save()
    res.status(201).send({
      status: res.statusCode,
      success: true,
      messages: 'New group created!',
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: res.statusCode,
      success: false,
      messages: 'Server error!',
    })
  }
}
exports.update = async (req, res) => {
  try {
    await GroupChat.findByIdAndUpdate(req.params.id, { $set: req.body })
    res.status(201).send({
      status: res.statusCode,
      success: true,
      messages: 'Data Updated!',
      data: req.body,
    })
  } catch (e) {
  }
}
