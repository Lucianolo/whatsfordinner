const mongoose = require('mongoose')
let TableSchema = new mongoose.Schema(
    {
        date: Date,
        location: String,
        description: String,
        seats: Number,
        featureImg: String,
        category: String,
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        guests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String
            }
        ]
    }
);

TableSchema.methods.addGuest = function(guest) {
    if (this.guests.length < this.seats) {
        this.guests.push(guest)
        return this.save()
    }
}

TableSchema.methods.deleteGuest = function(guest) {
    this.guests.filter(g => g !== guest)
    return this.save()
}

TableSchema.methods.comment = function(c) {
    this.comments.push(c)
    return this.save()
}

TableSchema.methods.getUserTables = function (_id) {
    Table.find({'host': _id}).then((tables) => {
        return tables
    })
}
module.exports = mongoose.model('Table', TableSchema)
