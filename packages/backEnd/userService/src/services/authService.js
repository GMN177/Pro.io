const express = require('express')
const jsend = require('jsend')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const jwt = require('jsonwebtoken')

const router = express.Router()

// delete entire user database (only for development management)
router.delete('/deleteTokens', async (req,res) => {
    try{
        let ret = await authController.deleteAllTokens()
        return res.status(ret.status).send(ret.response)
    }catch(err){
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

router.post('/token', async (req,res) => {
    let tk = req.body.refreshToken
    try {
        let decoded = jwt.verify(tk, process.env.REFRESH_TOKEN_SECRET)
        let a = await authController.findRefreshToken(tk)
        if(a.status){
            return res.status(a.status).send(a.response)
        }else{
            let at = jwt.sign({id:decoded.id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15m'})
            return res.status(200).send(jsend.success({new_access_token: at}))
        }
    }catch(err){
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

router.post('/login', async (req, res) => {
    if(req.body.username == null || req.body.password == null) res.status(400).send(jsend.fail({message: "Bad Request"}))
    try {
        const a  = await userController.login(req.body.username, req.body.password)
        if(a.status == 200) {
            let check = await authController.findRefreshTokenByUserId(a.response.data.id)
            if(check == null){
                let tokens = authController.generateTokens({id: a.response.data.id})
                let insertToken =  await authController.insertRefreshToken(tokens.refreshToken, a.response.data.id)
                return res.status(200).send(jsend.success({accessToken: tokens.accessToken, refreshToken: tokens.refreshToken}))
            }else{
                let at = jwt.sign({id:a.response.data.id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15m'})
                return res.status(200).send(jsend.success({accessToken: at, refreshToken: check.refresh_token}))
            }
        }else{
            return res.status(a.status).send(a.response)
        }
    }catch (err) {
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

router.post('/signup', async (req,res) => {
    try{
        const a = await userController.signup(req.body.username, req.body.email, req.body.password)
        return res.status(a.status).send(a.response)
    }catch (err) {
        if(Number(err.message) == 11000){
            return res.status(409).send(jsend.error({message: "duplicate key error"}))
        }else{
            return res.status(500).send(jsend.error({message: err.message}))
        }
    }
})

router.post('/logout', async (req, res) => {
    let tk = req.body.refreshToken
    try {
        let ret =  await authController.removeRefreshToken(tk)
        return res.status(ret.status).send(ret.response)
    }catch(err) {
        return res.status(500).send(jsend.error({message: err.message}))
    }
})

module.exports = router