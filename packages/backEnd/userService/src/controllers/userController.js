const User = require('../models/user')
const crypto = require('crypto')

async function signup(username, email, password) {

    salt = crypto.randomBytes(12).toString('base64')

    hash = crypto.createHash('sha256').update(password + salt).digest('base64')

    return new Promise(async (resolve, reject) => {
        try {
            const u = await User.create({
                username: username,
                email: email,
                password: hash,
                salt: salt,
                friends: []
            })
            resolve("user Added")
        }catch (err) {
            reject(err)
        }
    }) 
}

module.exports = {signup}



