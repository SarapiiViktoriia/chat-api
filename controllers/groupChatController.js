const GroupChat = require('../models/groupChatModel')
exports.show = async (req, res) => {
  let groupId = req.params.id
  try {
    const groupChat = await GroupChat.findOne({ _id: groupId }).populate({
      path: 'participants',
      select: 'username avatar bio'
    }).populate({
      path: 'createdBy',
      select: 'username avatar bio'
    })
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
  let userId = req.user._id
  let groupName = req.body.groupName
  let description = req.body.description
  try {
    const createdBy = userId
    const participants = req.body.participants
    const participantsData = participants.concat(createdBy)
    const groupChat = new GroupChat({
      createdBy: createdBy,
      participants: participantsData,
      groupName: groupName,
      description: description,
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
    await GroupChat.findByIdAndUpdate(req.params.id, {
      $push: { participants: { $each: req.body.participants } },
    })
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
