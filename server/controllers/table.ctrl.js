const Table = require('./../models/Table')
const User = require('./../models/User')
const fs = require('fs')
const cloudinary = require('cloudinary')
module.exports = {
    addTable: (req, res, next) => {
        let { location, description, seats, category } = req.body
        const date = Date.parse(req.body.date)
        /*if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, (result) => {
                let obj = { date, location, description, seats, category, feature_img: result.url !== null ? result.url : '' }
                saveTable(obj)
            },{
                resource_type: 'image',
                eager: [
                    {effect: 'sepia'}
                ]
            })
        }else {
            saveTable({ date, location, description, seats, category, feature_img: '' })
        }*/
        saveTable({ date, location, description, seats, category, featureImg: '' })
        function saveTable(obj) {
            new Table(obj).save((err, table) => {
                if (err)
                    res.send(err)
                else if (!table)
                    res.send(400)
                else {
                    return table.addHost(req.body.hostId).then((_table) => {
                        return res.send(_table)
                    })
                }
                next()
            })
        }
    },
    getAll: (req, res, next) => {
        Table.find(req.params.id)
            .populate('host')
            .populate('comments.author').exec((err, table)=> {
            if (err)
                res.send(err)
            else if (!table)
                res.send(404)
            else
                res.send(table)
            next()
        })
    },
    /**
     * tableId, guestId
     */
    addGuestToTable: (req, res, next) => {
        Table.findById(req.body.tableId).then((table)=> {
            return table.addGuest(req.body.guestId).then(()=>{
                return res.json({msg: "Done"})
            })
        }).catch(next)
    },
    /**
     * comment, authorId, tableId
     */
    commentTable: (req, res, next) => {
        Table.findById(req.body.tableId).then((table)=> {
            return table.comment({
                author: req.body.authorId,
                text: req.body.comment
            }).then(() => {
                return res.json({msg: "Done"})
            })
        }).catch(next)
    },
    /**
     * tableId
     */
    getTable: (req, res, next) => {
        Table.findById(req.params.id)
            .populate('host')
            .populate('comments.author').exec((err, table)=> {
            if (err)
                res.send(err)
            else if (!table)
                res.send(404)
            else
                res.send(table)
            next()
        })
    }
}
