const userController = require('./../controllers/user.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
module.exports = (router) => {
    /**
     * CREATE a User
     */
    router.post('/users', userController.createUser)

    /**
     * GET all Users
     */
    router.get('/users', userController.getAllUsers)

    /**
     * GET a specific Users
     */
    router.get('/users/:id', userController.getUser)

    /**
     * UPDATE a specific Users
     */
    router.put('/users/:id', userController.updateUser)

    /**
     * DELETE a specific Users
     */
    router.delete('/users/:id', userController.deleteUser)

    /**
     * Authenticate Users
     */
    router.post('/users/login', userController.authenticateUser)

}
