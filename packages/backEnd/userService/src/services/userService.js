const express = require('express')
const jsend = require('jsend')
const userController = require('../controllers/userController')
const router = express.Router()



router.use(express.json());

router.post('/signup', async (req,res) => {
    try{
        const a = await userController.signup(req.body.username, req.body.email, req.body.password)
        return res.status(200).send(jsend.success({message: a}))
    }catch (err) {
        if(Number(err.message) == 11000){
            return res.status(409).send(jsend.error({message: "duplicate key error"}))
        }else{
            return res.status(500).send(jsend.error({message: err.message}))
        }
    }
})

router.post('/login', async (req, res) => {
    try {
        const a  = await userController.login(req.body.username, req.body.password)
        if(!a.status) {
            return res.status(200).send(jsend.success({message: a.userId}))
        }else{
            return res.status(403).send(jsend.fail({message: a.message}))
        }
    }catch (err) {
        return res.status(500).send(jsend.error({message: err.message}))
    }
    
})

module.exports = router