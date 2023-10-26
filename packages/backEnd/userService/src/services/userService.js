const express = require('express')
const jsend = require('jsend')
const logger = require('../utils/logger')
const userController = require('../controllers/userController')
const friendController = require('../controllers/friendController')

const router = express.Router()

// delete entire user database (only for development management)
router.delete('/deleteUsers', async (req, res) => {
    try{
        let ret = await userController.deleteAllUsers()
        return res.status(ret.status).send(ret.response)
    }catch(err){
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

// get all users from database
router.get('/', async (req, res) => {
    try {
        let l = await userController.getAllUsers()
        return res.status(l.status).send(l.response)
    } catch(err)  {
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

// get single user from database.
router.get('/:id', async (req, res) => {
    try {
        let u = await userController.searchUserById(req.params.id)
        return res.status(u.status).send(u.response)
    } catch (err) {
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

// modify username and/or password.
router.patch('/:id', async (req, res) => {
    if(req.body.newUsername == null) {
        try{
            const ret = await userController.updatePassword(req.body.oldPassword, req.body.newPassword, req.params.id)
            return res.status(ret.status).send(ret.response)
        }catch(err) {
            return res.status(500).send(jsend.error({message: err.message}))
        }
    }
    else if(req.body.newPassword == null){
        try{
            const ret = await userController.updateUsername(req.body.newUsername, req.body.oldPassword, req.params.id)
            return res.status(ret.status).send(ret.response)
        }catch(err) {
            return res.status(500).send(jsend.error({message: err.message}))
        }
    }else{
        try{
            const ret2 = await userController.updateUsername(req.body.newUsername, req.body.oldPassword, req.params.id)
            const ret = await userController.updatePassword(req.body.oldPassword, req.body.newPassword, req.params.id)
            return res.status(ret.status).send(ret.response)
        }catch(err) {
            return res.status(500).send(jsend.error({message: err.message}))
        } 
    }
})

router.patch('/:id/updateStats', async (req, res) => {
    try {
        const ret = await userController.updateStats(req.params.id, req.body.isWin);
        return res.status(ret.status).send(ret.response);
    } catch (err) {
        logger.error(err.message);

        return res.status(500).send(jsend.error({
            message: err.message
        }));
    }
})

// delete user. (2 ways: remove it form the database or set his status to deleted).
router.delete('/:id', async (req, res) => {
    // DELETE ACCOUNT VERISION 2 (updates record status)
    try{
        let ret = await userController.deleteAccountV2(req.params.id)
        return res.status(ret.status).send(ret.response)
    }catch(err){
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

// add friend to user profile and to friend profile.
router.post('/friends', async (req, res) => {
    try{
        let ret = await friendController.addFriend(req.body.userId, req.body.friendId)
        return res.status(ret.status).send(ret.response)
    }catch(err){
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

// get user's friends
router.get('/:id/friends', async (req, res) => {
    try{
        let ret = await friendController.getUserFriends(req.params.id)
        return res.status(ret.status).send(ret.response)
    }catch(err){
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

// accept friend request
router.post('/:id/friends/accept', async (req, res) => {
    try{
        if(req.body.accept) {
            let ret = await friendController.acceptFriend(req.params.id, req.body.friendId)
            return res.status(ret.status).send(ret.response)
        }else{
            let ret = await friendController.refuseFriend(req.params.id, req.body.friendId)
            return res.status(ret.status).send(ret.response)
        }
    }catch(err){
        return res.status(500).send(jsend.error({message: err.message}))
    }
})





module.exports = router