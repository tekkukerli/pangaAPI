const mongoose = require('mongoose')  
require('dotenv').config()

module.exports = mongoose.model('Account', mongoose.Schema({
    name:     { type: String, required: true, minlength: 2, maxlength: 50, default: 'Main'},
    number:   { 
        type: String, 
        required: true,
        default: function(){
            return process.env.BANK_PREFIX + require('md5')(new Date().toISOString())
        }
    },
    userId :  { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    balance:  { type: Number, required: true, minlength: 0, default: 10000},
    currency: { type: String, required: true, default: 'EUR'}
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