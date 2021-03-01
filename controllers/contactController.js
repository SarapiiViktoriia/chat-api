const Contact = require('../models/contactModel')
const User = require('../models/userModel')
exports.store = async (req, res) => {
    const contact = new Contact(req.body._id)
    try {
        Contact.contactList.push(contact)
        res
            .status(201)
            .send({
                Messages: "ok"
            })
    } catch (error) {
        console.log(error);
    }
}
