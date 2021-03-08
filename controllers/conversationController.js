const Conversation = require('../models/conversationsModel')
exports.store = async (req, res) => {
    const conversation = new Conversation(req.body)
    try {
        await conversation.save()
        res.status(201).send({
            status: res.statusCode,
            success: true,
            messages: 'New conversation created!',
            conversation
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
