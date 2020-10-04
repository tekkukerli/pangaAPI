const router = require('express').Router()
const User = require('../models/User')
const auth = require('../middleware/auth')

//Log in 
router.post('/sessions', async(req, res) => {
      const userN = req.body.username;
      const pwd = req.body.password;
      try {
          const { username, password } = req.body
          
          if (!userN || !pwd) {
              return res.status(400).send({error: 'Missing username or password'})
          }
          const user = await User.findByCredentials(username, password)
          const token = await user.generateAuthToken()
          res.send({user})
      } catch (error) {
          res.status(401).send({ error: error.message })
      }
})

// Log out 
router.delete('/sessions', auth, async (req, res) => {
    try {
        req.user.sessions = req.user.sessions.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(204).send('No content') 
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router

