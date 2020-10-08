const router = require('express').Router()
const Session = require('../models/Session')
const userModel = require('../models/User')

//Log in 
router.post('/', async(req, res, next) => {

    //Get user by username from DB
    const user = await userModel.findOne({username: req.body.username})

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