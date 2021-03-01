const authUser = require('../middleware/authUser')
module.exports = app => {
  const contactController = require('../controllers/contactController')
  app.post('/api/contact/store', authUser, contactController.store)
}
