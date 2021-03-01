const authUser = require('../middleware/authUser')
module.exports = app => {
  const userController = require('../controllers/userController')
  app.post('/api/users/register', userController.register)
  app.post('/api/users/login', userController.login)
  app.get('/api/users', authUser, userController.index)
  app.get('/api/users/me', authUser, userController.show)
  app.put('/api/users/:id', authUser, userController.update)
  app.post('/api/users/me/avatar', authUser, userController.uploadAvatar)
  app.post('/api/users/getUser', authUser, userController.getUser)
  app.post('/api/users/:id/storeContact', userController.storeContact)
}
