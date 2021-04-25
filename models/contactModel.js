const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const contactSchema = new Schema(
  {
    listContacts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
contactSchema.plugin(timeZone, { paths: ['timestamps'] }, uniqueValidator)
const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact
