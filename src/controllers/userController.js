const multer = require('multer')
const auth = require('../middleware/auth')
const User = require('../models/userModel')
exports.register = async (req, res) => {
    const user = new User(req.body)
    try {
        user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
        console.log(e);
    }
}
exports.users = auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }
}
