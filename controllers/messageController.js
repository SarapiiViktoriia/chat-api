const Message = require('../models/messageModel')
const multer = require('multer')
const path = require('path')
exports.fetchMessage = async (req, res) => {
    Message.find().exec(function (err, results) {
        res.send(results)
    })
}
