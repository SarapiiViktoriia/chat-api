const auth = require('../middleware/auth')
const multer = require('multer')
const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }
    cb(undefined, true)
  },
})
module.exports = app => {
  const userController = require('../controllers/userController')
  app.post('/api/users/register', userController.register)
  app.post('/api/users/login', userController.login)
  app.get('/api/users/me', auth, userController.show)
  app.put('/api/users/:id', auth, userController.update)
  app.get('/api/users', auth, userController.index)
  app.post(
    '/api/user/me/avatar',
    auth,
    upload.single('avatar'),
    userController.upload,
  )
}
