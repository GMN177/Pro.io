const User = require('../models/user')
const crypto = require('crypto')

async function signup(username, email, password) {
    salt = crypto.randomBytes(12).toString('base64')
    hash = crypto.createHash('sha256').update(password + salt).digest('base64')
    try {
        const u = await User.create({
            username: username,
            email: email,
            password: hash,
            salt: salt,
            friends: [],
            totMatches: 0,
            totWins: 0,
            status: "ACTIVE"
        })
        return "user added"
    }catch (err) {
        if(err.code == 11000) throw new Error(err.code)
        else{
            throw new Error(err.message)
        }
    }
}

async function login(username, password){
    try {
        const u = await User.findOne({username: username})
        if(u == null){
            return {
                status: 1,
                message: "invalid username or password"
            }
        }
        const userSalt = u.salt
        if(crypto.createHash('sha256').update(password + userSalt).digest('base64') == u.password){
            return {status: 0, userId: u._id}
        }else{
            return {
                status: 1,
                message: "invalid username or password"
            }
        }
    }catch (err) {
        console.log(err.message)
        throw new Error(err.message)
    }
}

async function searchUserById(id) {
    try {
        const u = await User.findById(id)
        if(u == null) {
            return {
                status: 1,
                message: "invalid user id"
            }
        }
        return {
            status: 0,
            data: {
                id: u._id,
                username: u.username,
                email: u.email,
                totMatches: u.totMatches,
                totWins: u.totWins,
                friends: u.friends,
                status: u.status
            }
        }
    }catch (err) {
        console.log(err.message)
        throw new Error(err.message)
    }
}

async function getAllUsers() {
    try {
        const l = await User.find().select({
            password: 0,
            salt: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        return l
    } catch (err) {
        console.log(err.message)
        throw new Error(err.message)
    }
}

module.exports = {signup, login, searchUserById, getAllUsers}



