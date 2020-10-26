const router = require('express').Router()
const User = require('../models/User')
const Account = require('../models/Account')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {

    //Make sure credidentials are given and correct
    if(typeof req.body.name === "undefined" || req.body.name.length < 2 || req.body.name.length > 50) {
      res.status(400).send({ error: "Invalid name" })
        return
    }

    if(typeof req.body.username === "undefined" || req.body.username.length < 2 || req.body.username.length > 50) {
      res.status(400).send({ error: "Invalid username" })
        return
    }

    if(typeof req.body.password === "undefined" || req.body.password.length < 8 || req.body.password.length > 255) {
        res.status(400).send({ error: "Invalid password" })
        return
    }

    //Hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10,) 

    try {

      //Create new user 
      const user = await new User(req.body).save()

      //Create new account for user
      const account = await new Account({userId: user.id}).save()

      //Return user info
      res.status(201).send( {
        id: user.id,
        name: user.name,
        username: user.username,
        accounts: [account]
      })

    } catch (e) {

        //Catch duplicate username
        if(/E11000.*username.*dup key.*/.test(e.message)) {
          res.status(409).send({error: 'Username already exists'})
          return
        }

        //Other errors
        res.status(400).send({error: e.message})
    }
 
})

module.exports = router