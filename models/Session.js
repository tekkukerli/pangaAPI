const mongoose = require('mongoose')  
const User = require('../models/User')

module.exports = mongoose.model('Session', mongoose.Schema({
    userId :  { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    token:    { type: String }
}, {
    //Transform _id to id
    toJSON: { 
        transform: (docIn, docOut) => {
            delete docOut._id
            delete docOut.__v
            delete docOut.userId
        }
    }
}))