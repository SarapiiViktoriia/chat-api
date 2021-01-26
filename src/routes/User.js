const auth = require('../middleware/auth')
const multer = require('multer')
const path = require('path');
module.exports = app => {
  const userController = require('../controllers/userController')
  app.post('/api/users/register', userController.register)
  app.post('/api/users/login', userController.login)
  app.get('/api/users/me', auth, userController.show)
  app.put('/api/users/:id', auth, userController.update)
  app.get('/api/users', auth, userController.index)
  app.post('/api/users/avatar/:id', userController.uploadAvatar)
}
