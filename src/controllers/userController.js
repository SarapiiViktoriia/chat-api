const User = require('../models/userModel')
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
      res.send({ Message: 'Failed to Update Data!' })
    } else {
      res.status(201).send({ Message: 'Data Updated!' })
    }
  })
}
;(exports.upload = async (req, res) => {
  req.user.avatar = req.file.buffer
  await req.user.save()
  res.send({ message: 'berhasil di upload' })
}),
  (error, req, res) => {
    res.status(400).send({ error: error.message })
  }
