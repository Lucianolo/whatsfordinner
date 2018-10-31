const userController = require('./../controllers/user.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
const passport = require('passport')

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

    router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
        return res.json({
            id: req.user._id,
            userName: req.user.userName,
            email: req.user.email
        })
    })

}
