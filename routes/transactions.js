const router = require('express').Router()
//const sessionModel = require('../models/Session')
//const userModel = require('../models/User')
//const accountModel = require('../models/Account')
const bankModel = require('../models/Bank')
const {verifyToken} = require('../middlewares')

//Log in 
router.post('/', async(req, res, next) => {

    //Get account data from DB
    const accountFromObject = await accountModel.findOne({number: req.body.accountFrom})

    //Check that account exists
    if(!accountFromObject){
        return res.status(404).json({error: 'Account not found'})
    }

    //Check that accountFrom belongs to the user
    if(accountFromObject.userId !== req.userId){
        return res.status(403).json({error: 'Forbidden'})
    }

    //Check for sufficient funds
    if(req.body.amount > accountFromObject.balance){
        return res.status(402).json({error: 'Insufficient funds'})
    }

    //Check for invalid amounts
    if(req.body.amount <= 0){
        return res.status(400).json({error: 'Invalid amount'})
    }

    //Check destination bank
    const banks = bankModel.find()


    return res.status(200).json({})
})



module.exports = router