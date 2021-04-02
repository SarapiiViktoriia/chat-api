module.exports = app => {
  const messageController = require('../controllers/messageController')
  app.post('/api/messages', messageController.sendMessage)
  app.get('/api/messages/:id', messageController.fetchMessage)
}
