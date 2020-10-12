const mongoose = require('mongoose');

module.exports = mongoose.model('Transaction', new mongoose.Schema({
    createdAt:   {type: Date, required: true, default: Date.now},
    userId:      {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    amount:      {type: Number, required: true, min: 1},
    currency:    {type: String, required: true},
    accountFrom: {type: String, required: true},
    accountTo:   {type: String, required: true},
    explanation: {type: String, required: true, minlength: 1},
    senderName:  {type: String, required: true, minlength: 1},
    status:      {type: String, required: true, enum : ['pending', 'completed', 'inProgress', 'failed'], default: 'pending'}
}, {
    toJSON: {
        transform: function (docIn, docOut) {
            docOut.id = docOut._id
            delete docOut._id;
        }
    }
}))