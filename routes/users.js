const router = require('express').Router()
const User = require('../models/User')
const Account = require('../models/Account')
const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')

router.post('/users', async (req, res) => {

//Check for missing credidentials
    const name = req.body.name;
    const userN = req.body.username;
    const pwd = req.body.password;

    if (!name || !userN || !pwd) {
        return res.status(400).json({
          error: true,
          message: "Missing name, username or password."
        });
    }

    //Make sure password is given
    if(typeof req.body.password === "undefined" || req.body.password.length < 8) {
        res.status(400).send({ error: "Invalid password" })
        return
    }

    //Hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10,) 

    
    try {

      //Create new user 
      const user = await new User(req.body).save()
      const user2 = await User.findOne({_id: user.id}).select('-_id -__v -password')
      delete user.password
      
      //.generateAccountNumber()

      //Create neq account for user
      const account = await new Account({userId: user.id}).save()

      //Inject account into user object
      user.accounts = [account]

      //Return user
      res.status(201).send(user)

    } catch (e) {
        res.status(400).send({error: e.message})
    }
 
})


// View user profile
router.get('/users/current', auth, async(req, res) => {
  res.send(req.user)
})

 

module.exports = router