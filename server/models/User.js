const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

let UserSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true, index: { unique: true } },
        password: { type: String, required: true },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
)

UserSchema.pre('save', function(next) {
    let user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

UserSchema.methods.follow = function (userId) {
    if (this.following.indexOf(userId) === -1) {
        this.following.push(userId)
    }
    return this.save()
}

UserSchema.methods.addFollower = function (fs) {
    this.followers.push(fs)
}

module.exports = mongoose.model('User', UserSchema)
