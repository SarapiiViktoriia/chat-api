const roomChat = require('../models/roomChatModel')
exports.index = async (req, res) => {
    try {
        const roomChat = await roomChat.find({})
        res.status(200).send({ roomChat })
    } catch (e) {
        res.status(500).send(e)
    }
}
exports.store = async (req, res) => {
    const roomchat = new roomChat(req.body)
    try {
        await roomchat.save()
        res.status(201).send({ "message" : 'ok' })
    } catch (e) {
        res.status(500).send(e)
    }
}
