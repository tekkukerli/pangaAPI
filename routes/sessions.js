const router = require('express').Router()
const User = require('../models/User')
const Session = require('../models/Session')

//Log in 
router.post('/', async(req, res) => {
    const userN = req.body.username;
    const pwd = req.body.password;
    try {
        const { username, password } = req.body
        
        if (!userN || !pwd) {
            return res.status(400).send({error: 'Missing username or password'})
        }
        const user = await User.findByCredentials(username, password)
        const token = await user.generateAuthToken()
        const session = await new Session({ userId: user.id, token: token}).save() //saves to database
        res.send( {
            userId: user.id,
            token: token
            
          })
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
})

// Log out 
router.delete('/', async (req, res) => {
    const tokenN = req.header('Authorization')
    if (!tokenN) return res.status(401).send({error: 'Unauthorised'})

    const token = req.header('Authorization').replace('Bearer ', '')

  try {
    const findSession = await Session.findOne({ 'token': token })
    if (!findSession) {
        res.status(422).send({error: 'Did not find valid session'}) 
    } else {
        await Session.deleteOne({'token': token })
        res.status(204).send('No content') 
    }
      
  } catch (error) {
      res.status(500).send({ error: error.message })
  }
})

module.exports = router