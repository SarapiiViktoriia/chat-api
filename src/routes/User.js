const auth = require('../middleware/auth')
module.exports = app => {
  const userController = require('../controllers/userController')
  app.post('/api/user/register', userController.register)
  app.post('/api/user/login', userController.login)
  app.get('/api/user/me', auth, userController.show)
  app.get('/api/users', auth, userController.users)
}
