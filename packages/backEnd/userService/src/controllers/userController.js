const User = require('../models/user')
const crypto = require('crypto')
const { default: mongoose } = require('mongoose')

function checkUserPw(pwToCheck, hash, salt) {
    if(crypto.createHash('sha256').update(pwToCheck + salt).digest('base64') == hash){
        return true
    }
    return false
}

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
        if(checkUserPw(password, u.password, userSalt)){
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

    if(!mongoose.isValidObjectId(id)){
        return {
            status: 1,
            message: 'invalid userId'
        }
    }

    try {
        const u = await User.findById(id)
        if(u == null) {
            return {
                status: 1,
                message: "invalid userId"
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

async function getUserPassword(id) {

    if(!mongoose.isValidObjectId(id)){
        return null
    }

    try {
        const u = await User.findById(id)
        if(u == null) { return null }
        return {hash: u.password, salt: u.salt}
    }catch (err) {
        console.log(err.message)
        throw new Error(err.message)
    }
}

async function updateUsername(newUsername, oldPassword, id){

    if(!mongoose.isValidObjectId(id)){
        return {
            status: 1,
            message: 'invalid userId'
        }
    }

    try {
        const data = await getUserPassword(id)
        if(data == null || !checkUserPw(oldPassword, data.hash, data.salt)){
            return {
                status: 1,
                message: "something went wrong,"
            }
        }
        let ret = await User.findOneAndUpdate({_id: id}, {username: newUsername}, {new: true})
        console.log(ret)
        return {
            status: 0,
            message: "record updated"
        }
    }catch(err){
        throw new Error(err.message)
    }
}

// SHULD BE TESTED! IT MAY STILL HAS SOME BUGS
async function updatePassword(oldPassword, newPassword, id){

    if(!mongoose.isValidObjectId(id)){
        return {
            status: 1,
            message: 'invalid userId'
        }
    }

    try {
        const data = await getUserPassword(id)
        if(data == null || !checkUserPw(oldPassword, data.hash, data.salt)) { 
            return {
                status: 1,
                message: "something went wrong."
            }
        }
        let update = {password: crypto.createHash('sha256').update(newPassword + data.salt).digest('base64')}
        let ret = await User.findOneAndUpdate({_id: id}, update, {new: true})
        console.log(ret)
        return {
            status: 0,
            message: "record updated"
        }
    }catch(err) {
        throw new Error(err.message)
    }
}

// delete account version 1 (deletes entire user record)
async function deleteAccountV1(id) {
    if(!mongoose.isValidObjectId(id)){
        return {
            status: 1,
            message: 'invalid userId'
        }
    }

    try{
        let u = await User.deleteOne({_id: id})
        console.log(u)
        if(u.deletedCount == 0) {
            return {
                status: 1,
                message: 'invalid userId'
            }
        }
        return {
            status: 0,
            message: 'account deleted successfully'
        }
    }catch(err){
        console.log(err.message)
        throw new Error(err.message)
    }
}

// delete account version 2 (sets account status to DELETED)
async function deleteAccountV2(id) {
    if(!mongoose.isValidObjectId(id)){
        return {
            status: 1,
            message: 'invalid userId'
        }
    }
    try{
        let ret = await User.findOneAndUpdate({_id: id}, {status: 'DELETED'})
        if(ret == null){
            return {
                status: 1,
                message: 'invalid userId'
            }
        }
        return {
            status: 0,
            message: 'account deleted successfully'
        }
    }catch(err){
        throw new Error(err.message)
    }
}

// adds both friends
// maybe we should implements notifications for friend requests (both users should accept the request to become friends )
async function addFriend(id1, id2) {
    if(!mongoose.isValidObjectId(id1) || !mongoose.isValidObjectId(id2)){
        return {
            status: 2,
            message: 'invalid userId or friendId'
        }
    }
    try{
        let ret = await User.findOne({_id: id1}).exec()
        if(!ret.friends.includes(id2)){
            ret.friends.push(id2)
            ret.save()
        }else{
            return {
                status: 1,
                message: 'something went wrong'
            }
        }
        ret = await User.findOne({_id: id2}).exec()
        if(!ret.friends.includes(id1)){
            ret.friends.push(id1)
            ret.save()
        }else{
            return {
                status: 1,
                message: 'something went wrong'
            }
        }
        return {
            status: 0,
            message: 'friends added'
        }
    }catch(err){
        throw new Error(err.message)
    }
}

async function getUserFriends(id){
    if(!mongoose.isValidObjectId(id)){
        return {
            status: 2,
            message: 'invalid userId or friendId'
        }
    }
    try{
        let ret = await User.findById(id)
        if(ret==null) {
            return {
                status: 1,
                message: 'user not found'
            }
        }
        return {
            status: 0,
            friends: ret.friends
        }
    }catch(err){
        throw new Error(err.message)
    }
}

module.exports = {signup, login, searchUserById, getAllUsers, updatePassword, updateUsername, deleteAccountV1, deleteAccountV2, addFriend, getUserFriends}