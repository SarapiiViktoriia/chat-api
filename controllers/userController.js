const User = require('../models/userModel')
const multer = require('multer')
const path = require('path')
exports.register = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).send({ user })
  } catch (e) {
    res.status(400).send({ msg: 'error!' })
    console.log(e)
  }
}
exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const tokenData = await user.generateAuthToken()
    await User.findByIdAndUpdate(
      user._id,
      { $set: { token: tokenData } },
      function(err) {},
    )
  } catch (e) {
    res.status(422).send({
      message: 'Login Gagal',
    })
    console.log(e)
  }
  try {
    const users = await User.findOne({ email: req.body.email })
    res.status(200).send({ users })
  } catch (e) {
    res.status(500).send(e)
    console.log(e)
  }
}
exports.logout = async (req, res) => {
  try {
    req.user.tokens = null
    await req.user.save()
    res.send({ message: 'Logout berhasil' })
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: 'Logout Gagal' })
  }
}
exports.index = async (req, res) => {
  try {
    const user = await User.find({})
    res.status(200).send(user)
  } catch (e) {
    res.status(500).send()
  }
}
exports.show = async (req, res) => {
  res.send(req.user)
}
exports.update = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
  ) {
    if (res.status == 500) {
      console.log(err)
      res.send({ message: 'Failed to Update Data!' })
    } else {
      res.status(201).send({ Message: 'Data Updated!' })
    }
  })
}
exports.showImage = async (req, res) => {
  await User.findOne({ avatar: req.params.avatar }),
    function(err) {
      if (res.status == 500 || res.status == 404) {
        res.send({ message: 'Failed to load avatar!', code: res.status })
      } else {
        res.status(200).send({ message: 'avatar is great!' })
      }
    }
}
exports.uploadAvatar = async (req, res) => {
  const diskStorageToUploads = multer.diskStorage({
    destination: path.join('./public/uploads/avatar'),
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + '-' + req.params.id + path.extname(file.originalname),
      )
    },
  })
  let fileFilter = function(req, file, cb) {
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(
        {
          success: false,
          message: 'Invalid file type. Only jpg, png image files are allowed.',
        },
        false,
      )
    }
  }
  const saveToUploads = multer({
    storage: diskStorageToUploads,
    limits: {
      fileSize: 200 * 1024 * 1024,
    },
    fileFilter: fileFilter,
  })
  const upload = saveToUploads.single('avatar')
  upload(req, res, function(error) {
    if (error) {
      res.status(500)
      if (error.code == 'LIMIT_FILE_SIZE') {
        error.message = 'File Size is too large. Allowed file size is 2 MB'
        error.success = false
      }
      console.log(error)
      return res.json(error)
    } else {
      if (!req.file) {
        res.status(500)
        res.json('File not found')
      }
      const fileName =
        req.protocol +
        ':
        req.get('host') +
        '/uploads/avatar/' +
        req.file.filename
      User.findByIdAndUpdate(
        req.params.id,
        { $set: { avatar: fileName } },
        function(err) {
          if (res.status == 500) {
            console.log(err)
            res.send({ Message: 'Failed to Update Data!' })
          } else {
            res.status(201).send({
              success: true,
              message: 'File uploaded successfully!',
              avatar: fileName,
            })
          }
        },
      )
    }
  })
}
