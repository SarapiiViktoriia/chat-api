const Contact = require('../models/contactModel')
const User = require('../models/userModel')
exports.index = async (req, res) => {
  let ownerId = req.user._id
  try {
    const contact = await Contact.findOne({ ownerId: ownerId }).populate({
      path: 'listContacts',
      select: 'username avatar about',
    })
    res.status(200).send({
      status: res.statusCode,
      success: true,
      messages: 'Success load data!',
      contact,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: res.statusCode,
      success: false,
      messages: 'Server error!',
    })
  }
}
exports.store = async (req, res) => {
  let listContacts = req.body.listContacts
  let ownerId = req.user._id
  try {
    const findContactBook = await Contact.findOne({
      ownerId: ownerId,
    }).countDocuments()
    const data = await Contact.findOne({ ownerId: ownerId })
    if (listContacts == ownerId) {
      res.status(200).send({
        status: res.statusCode,
        success: true,
        messages: "You can't add yourself!",
      })
    } else {
      let contactArr = data.listContacts
      let findContact = contactArr.indexOf(listContacts)
      if (findContact >= 0) {
        res.status(200).send({
          status: res.statusCode,
          success: true,
          messages: 'Contact already exists!',
        })
      } else {
        if (findContactBook === 1) {
          await Contact.findOneAndUpdate(
            { ownerId: ownerId },
            { $addToSet: { listContacts: listContacts } },
            { new: true, safe: true, upsert: true }
          )
        } else {
          const contact = new Contact({
            listContacts: listContacts,
            ownerId: ownerId,
          })
          contact.save()
        }
        res.status(201).send({
          status: res.statusCode,
          success: true,
          messages: 'New contact created!',
        })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: res.statusCode,
      success: false,
      messages: 'Failed to add a new contact!',
    })
  }
}
exports.destroy = async (req, res) => {
  let listContacts = req.params.idUser
  let ownerId = req.user._id
  try {
    await Contact.findOneAndUpdate(
      { ownerId: ownerId },
      { $pull: { listContacts: listContacts } },
      { safe: true }
    )
    res.status(200).send({
      status: res.statusCode,
      success: true,
      messages: 'Contact deleted!',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: res.statusCode,
      success: false,
      messages: 'Server error!',
    })
  }
}
