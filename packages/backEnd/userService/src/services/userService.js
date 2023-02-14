const express = require('express')
const jsend = require('jsend')
const userController = require('../controllers/userController')
const router = express.Router()
const {generateTokens} = require('../controllers/authController')
const { response } = require('express')


router.use(express.json());

// user registration.
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

// user login.
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

// get all users from database
router.get('/', async (req, res) => {
    try {
        let l = await userController.getAllUsers()
        return res.status(200).send(jsend.success({users: l}))
    } catch(err)  {
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

// get single user from database.
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

// modify username and/or password.
router.patch('/:id', async (req, res) => {
    if(req.body.newUsername == null) {
        console.log("newUsername is null")
        try{
            const ret = await userController.updatePassword(req.body.oldPassword, req.body.newPassword, req.params.id)
            if(!ret.status){
                return res.status(406).send(jsend.fail({message: ret.message}))
            }else if(ret.status == 2){
                return res.status(404).send(jsend.fail({message: ret.message}))
            }else{
                return res.status(200).send(jsend.success({message: ret.message}))
            }
        }catch(err) {
            return res.status(500).send(jsend.error({message: err,message}))
        }
    }
    else if(req.body.newPassword == null){
        try{
            const ret = await userController.updateUsername(req.body.newUsername, req.body.oldPassword, req.params.id)
            console.log(ret)
            if(ret.status == 1){
                return res.status(500).send(jsend.error({message: ret.message}))
            }else if(ret.status == 2){
                return res.status(404).send(jsend.fail({message: ret.message}))
            }else{
                return res.status(200).send(jsend.success({message: ret.message}))
            }
        }catch(err) {
            return res.status(500).send(jsend.error({message: err,message}))
        }
    }else{
        try{
            const ret2 = await userController.updateUsername(req.body.newUsername, req.body.oldPassword, req.params.id)
            const ret = await userController.updatePassword(req.body.oldPassword, req.body.newPassword, req.params.id)
            if(!ret.status || !ret2.status){
                return res.status(200).send(jsend.success({message: ret.message}))
            }else if(ret.status == 2 || ret2.status == 2){
                return res.status(404).send(jsend.fail({message: ret.message}))
            }else {
                return res.status(500).send(jsend.error({message: {fail1: ret.message, fail2: ret2.message}}))
            }
        }catch(err) {
            return res.status(500).send(jsend.error({message: err,message}))
        } 
    }
})

// delete user. (2 ways: remove it form the database or set his status to deleted).
// if the second option is adopted, some changes to the login route should be made.
router.delete('/:id', async (req, res) => {
    // DELETE ACCOUNT VERSION 1 (removes entire record)
    try{
        let ret = await userController.deleteAccountV1(req.params.id)
        if(!ret.status){
            return res.status(200).send(jsend.success({message: ret.message}))
        }
        return res.status(404).send(jsend.fail({message: ret.message}))
    }catch(err){
        return response.status(500).send(jsend.error({message: err.message}))
    }

    // DELETE ACCOUNT VERISION 2 (updates record status)
    // try{
    //     let ret = await userController.deleteAccountV2(req.params.id)
    //     if(!ret.status){
    //         return res.status(200).send(jsend.success({message: ret.message}))
    //     }
    //     return res.status(404).send(jsend.fail({message: ret.message}))
    // }catch(err){
    //     return res.status(500).send(jsend.error({message: err.message}))
    // }
})

// add friend to user profile and to friend profile.
router.post('/friends', async (req, res) => {
    try{
        let ret = await userController.addFriend(req.body.userId, req.body.friendId)
        if(!ret.status) {
            return res.status(200).send(jsend.success({message: ret.message}))
        }
        else if(ret.status==2) {
            return res.status(404).send(jsend.fail({message: ret.message}))
        }
        return res.status(500).send(jsend.error({message: ret.message}))
    }catch(err){
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

// get user's friends
router.get('/:id/friends', async (req, res) => {
    try{
        let ret = await userController.getUserFriends(req.params.id)
        if(!ret.status){
            return res.status(200).send(jsend.success({message: ret.friends}))
        }else if(ret.status == 2){
            return res.status(404).send(jsend.fail({message: ret.message}))
        }
        return res.status(404).send(jsend.error({message: ret.message}))
    }catch(err){
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

module.exports = router