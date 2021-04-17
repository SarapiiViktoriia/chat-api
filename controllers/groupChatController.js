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
  } catch (error) {
    console.log(error)
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
  } catch (error) {
    console.log(error)
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
    res.send({
      status: res.statusCode,
      success: true,
      messages: 'Data updated!',
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: res.statusCode,
      success: false,
      messages: 'Server error!',
    })
  }
}
exports.storeParticipants = async (req, res) => {
  try {
    await GroupChat.findByIdAndUpdate(req.params.id, { $push: { "participants": { $each: req.body.participants } } })
    res.send({
      status: res.statusCode,
      success: true,
      messages: 'New Participants added',
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: res.statusCode,
      success: false,
      messages: 'Server error!',
    })
  }
}
exports.destroy = async (req, res) => {
  try {
    await GroupChat.findByIdAndDelete(req.params.id)
    res.send({
      status: res.statusCode,
      success: true,
      messages: 'Data deleted!',
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: res.statusCode,
      success: false,
      messages: 'Server error!',
    })
  }
}
