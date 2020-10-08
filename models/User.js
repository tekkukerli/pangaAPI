const mongoose = require('mongoose') 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//module.exports = mongoose.model('User', mongoose.Schema({
    const userSchema = mongoose.Schema({
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
})

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    await user.save()
    return token
}

// Search for a user by email and password
userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username} )
    if (!user) {
        throw new Error('User does not exist')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Wrong password') //see muuda ära 
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User