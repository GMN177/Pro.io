const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateTokens(data) {
    return {
        accessToken: jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'}),
        refreshToken: jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
    }
}

module.exports = {generateTokens}