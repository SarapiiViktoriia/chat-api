const mongoose = require('mongoose')
const Schema = mongoose.Schema
const contactSchema = new Schema(
    {
        listContacts: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        ownerId: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    },
)
const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact
