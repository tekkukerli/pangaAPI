const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {

//Check if token is missing or invalid
    const tokenN = req.header('Authorization')
    if (!tokenN) return res.status(401).send({error: 'Unauthorised'})
        

    const token = req.header('Authorization').replace('Bearer ', '')
    try {
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'sessions.token': token })

        if (!user) throw new Error()
       
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Unauthorised' })
    }
}

module.exports = auth