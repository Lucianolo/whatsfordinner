const User = require('./../models/User')
module.exports = {
    createUser: (req, res, next) => {
        console.log(req.body)
        const userData = {
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            followers: [],
            following: []
        }
        User.create(userData, (err, user) => {
            if (err) return next(err)
            res.send(user)
        })
    },

    getAllUsers: (req, res, next) => {
        User.find({}, (err, users) => {
            if (err) return next(err)
            res.send(users)
        })
    },

    getUser: (req, res, next) => {
        User.findById(req.params.id, (err, user) => {
            if (err) return next(err)
            res.send(user)
        })
    },

    updateUser: (req, res,next) => {
        User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, user) => {
            if (err) return next(err)
            res.send(user)
        })
    },

    deleteUser: (req, res, next) => {
        User.findByIdAndRemove(req.params.id, (err) => {
            if (err) return next(err)
            res.send('User deleted successfully!')
        })
    },

    authenticateUser: (req, res, next) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err) return next(err)
            // test a matching password
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) next(err)
                if (isMatch) {
                    req.session.userId = user._id
                    res.send('Successful login!')
                } else {
                    res.send('Wrong Password')
                }
            })
        })
    }
}
