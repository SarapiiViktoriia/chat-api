const authUser = require('../middleware/authUser')
module.exports = app => {
    const roomChatController = require('../controllers/roomChatController')
    app.get('/api/roomchat', authUser, roomChatController.index)
    app.post('/api/roomchat', authUser, roomChatController.store)
}
