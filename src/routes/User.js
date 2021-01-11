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
  app.post('/api/user/register', userController.register)
  app.post('/api/user/login', userController.login)
  app.get('/api/user/me', auth, userController.show)
  app.get('/api/users', auth, userController.users)
  app.post('/api/user/me/avatar', auth,upload.single('avatar'), userController.upload)
}
