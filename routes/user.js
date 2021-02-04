const authUser = require('../middleware/authUser')
module.exports = app => {
  const userController = require('../controllers/userController')
  app.post('/api/users/register', userController.register)
  app.post('/api/users/login', userController.login)
  app.post('/api/users/logout', authUser, userController.logout)
  app.get('/api/users/me', authUser, userController.show)
  app.put('/api/users/:id', authUser, userController.update)
  app.post('/api/users/avatar/:id', authUser, userController.uploadAvatar)
  app.get('/api/users', authUser, userController.index)
}
