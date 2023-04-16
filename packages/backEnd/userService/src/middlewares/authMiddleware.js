const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticateToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    if(token == undefined) {
        console.log("UNAUTHORIZED")
        return res.sendStatus(401)
    } 
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) {
            console.log("FORBIDDEN")
            return res.sendStatus(403)
        }
        req.body.tokenData = data
        console.log("ACCESS GRANTED")
        next()
    })
}

function testMiddleware(req,res,next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    if(token == undefined) {
        console.log("UNAUTHORIZED")
        return res.sendStatus(401)
    }
    req.body.tokenData = token
    next()
}

module.exports = {authenticateToken, testMiddleware}