const express = require('express')
const jsend = require('jsend')
const userController = require('../controllers/userController')
const router = express.Router()
const {generateTokens} = require('../controllers/authController')

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
    if(req.body.username == null || req.body.password == null) res.status(400).send(jsend.fail({message: "Bad Request"}))
    try {
        const a  = await userController.login(req.body.username, req.body.password)
        if(!a.status) {
            let tokens = generateTokens({id: a.userId})
            return res.status(200).send(jsend.success({accessToken: tokens.accessToken, refreshToken: tokens.refreshToken}))
        }else{
            return res.status(403).send(jsend.fail({message: a.message}))
        }
    }catch (err) {
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

router.get('/', async (req, res) => {
    try {
        let l = await userController.getAllUsers()
        return res.status(200).send(jsend.success({users: l}))
    } catch(err)  {
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

router.get('/:id', async (req, res) => {
    try {
        let u = await userController.searchUserById(req.params.id)
        if(!u.status) return res.status(200).send(jsend.success({user: u}))
        else{
            return res.status(404).send(jsend.fail({message: u.message}))
        }
    } catch (err) {
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

router.patch('/:id', async (req, res) => {
    if(req.body.newUsername == null) {
        console.log("newUsername", req.body.newUsername)
        try{
            const ret = userController.updatePassword(req.body.oldPassword, req.body.newPassword, req.params.id)
            if(!ret.status){
                return res.status(406).send(jsend.fail({message: ret.message}))
            }else{
                return res.status(200).send(jsend.success({message: ret.message}))
            }
        }catch(err) {
            return res.status(500).send(jsend.error({message: err,message}))
        }
    }
    else if(req.body.newPassword == null){
        console.log("newUsername", req.body.newUsername)
        try{
            const ret = userController.updateUsername(req.body.newUsername, req.body.oldPassword, req.params.id)
            if(!ret.status){
                return res.status(406).send(jsend.fail({message: ret.message}))
            }else{
                return res.status(200).send(jsend.success({message: ret.message}))
            }
        }catch(err) {
            return res.status(500).send(jsend.error({message: err,message}))
        }
    }else{
        console.log("no null values")
        try{
            const ret = userController.updatePassword(req.body.oldPassword, req.body.newPassword, req.params.id)
            const ret2 = userController.updateUsername(req.body.newUsername, req.body.oldPassword, req.params.id)
            if(!ret.status || !ret2.status){
                return res.status(406).send(jsend.fail({message: {fail1: ret.message, fail2: ret2.message}}))
            }else{
                return res.status(200).send(jsend.success({message: ret.message}))
            }
        }catch(err) {
            return res.status(500).send(jsend.error({message: err,message}))
        }
        
    }
})

module.exports = router