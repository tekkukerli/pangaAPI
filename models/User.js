const mongoose = require('mongoose')  
const jwt = require('jsonwebtoken')

//const userSchema = mongoose.Schema({
module.exports = mongoose.model('User', mongoose.Schema({
    name:     { type: String, required: true, minlength: 2, maxlength: 50},
    username: { type: String, required: true, minlength: 2, maxlength: 50, unique: true},
    password: { type: String, required: true, minlength: 8, maxlength: 255},
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }]
    /*sessions: [{
        token: {
            type: String,
            required: true
        }
    }]*/
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


/*
// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.sessions = user.sessions.concat({token})
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

// Generate account number for the user
userSchema.methods.generateAccountNumber = async function() {
    const user = this
    const number = 'KBA' + Math.floor((Math.random() * 1000000000) + 1)
    user.account = user.account.concat({number})
    await user.save()
    return number
}
*/

//const User = mongoose.model('User', userSchema)
//module.exports = User

