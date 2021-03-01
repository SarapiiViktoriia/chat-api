const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const contactSchema = new Schema(
    {
        userId : {
            type: Schema.Types.ObjectId
        },
        contactList: [
            {
                _Id: {
                    type: Schema.Types.ObjectId
                },
                username: {
                    type: String
                },
                avatar: {
                    type: String
                }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
    },
)
const Contact = mongoose.model('Contact', contactSchema ) 
module.exports = Contact 
