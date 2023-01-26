const express = require('express')
const jsend = require('jsend')
const userController = require('../controllers/userController')
const router = express.Router()



router.use(express.json());

router.post('/signup', (req,res) => {
    
    a = userController.signup(req.body.username, req.body.email, req.body.password)
    a.then((data) => {
        res.status(200).send(jsend.success({message: data}))
    }).catch((err) => {
        if(err.code == 11000){
            res.status(409).send(jsend.error({message: err.message}))
        }else{
            res.status(500).send(jsend.error({message: err.message}))
        } 
    }) 
})

module.exports = router