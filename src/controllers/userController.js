const User = require('../models/userModel')
exports.register = async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
    console.log(e)
  }
}
exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).send({ user, token })
  } catch (e) {
    res.status(422).send({
      message: 'Login Gagal',
    })
  }
}
exports.users = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (e) {
    res.status(500).send()
  }
}
exports.show = async (req, res) => {
  res.send(req.user)
}
;(exports.upload = async (req, res) => {
  req.user.avatar = req.file.buffer
  await req.user.save()
  res.send({ message: 'berhasil di upload' })
}),
  (error, req, res) => {
    res.status(400).send({ error: error.message })
  }
