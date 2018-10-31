const User = require('./../models/User')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

module.exports = {
    createUser: (req, res, next) => {
        const { errors, isValid } = validateRegisterInput(req.body)
        if(!isValid) {
            return res.status(400).json(errors)
        }
        User.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                return res.status(400).json({
                    email: 'Email already exists'
                })
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })
                const userData = {
                    email: req.body.email,
                    userName: req.body.userName,
                    password: req.body.password,
                    followers: [],
                    following: [],
                    avatar
                }
                User.create(userData, (err, user) => {
                    if (err) return next(err)
                    res.send(user)
                })
            }
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
        const { errors, isValid } = validateLoginInput(req.body)
        if(!isValid) {
            return res.status(400).json(errors)
        }
        const {email, password} = req.body
        User.findOne({email: email})
            .then((user) => {
                if (!user) {
                    errors.email = 'User not found'
                    return res.status(404).json(errors)
                }
                user.comparePassword(password, (err, isMatch) => {
                    if (err) next(err)
                    if (isMatch) {
                        const payload = {
                            id: user._id,
                            userName: user.userName,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, 'whatsfordinner-dev', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err)
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                })
                            }
                        })
                    } else {
                        errors.password = 'Incorrect Password'
                        return res.status(400).json(errors)
                    }
                })
        })
    }
}
