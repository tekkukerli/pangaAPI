const mongoose = require('mongoose')  

module.exports = mongoose.model('User', mongoose.Schema({
    name:     { type: String, required: true, minlength: 2, maxlength: 50},
    username: { type: String, required: true, minlength: 2, maxlength: 50, unique: true},
    password: { type: String, required: true, minlength: 8, maxlength: 255},
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }]
}, {
    //Transform _id to id
    toJSON: { 
        transform: (docIn, docOut) => {
            docOut.id = docOut._id
            delete docOut._id
            delete docOut.__v
        }
    }
}))