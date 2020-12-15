module.exports = (app) => {
    const userController = require('../controllers/userController')
    app.post('/user/register', userController.register)
    app.get('/users', userController.users)
}
