const User = require('../models/user')
const crypto = require('crypto')
const { default: mongoose } = require('mongoose')
const responses = require('../models/responses')

function checkUserPw(pwToCheck, hash, salt) {
    if(crypto.createHash('sha256').update(pwToCheck + salt).digest('base64') == hash){
        return true
    }
    return false
}

async function getUserPassword(id) {
    if(!mongoose.isValidObjectId(id)){
        return null
    }
    try {
        const u = await User.findById(id).where('status').equals('ACTIVE')
        if(u == null) { return null }
        return {hash: u.password, salt: u.salt}
    }catch (err) {
        throw new Error(err.message)
    }
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
            pending: [],
            sent: [],
            totMatches: 0,
            totWins: 0,
            status: "ACTIVE"
        })
        let response = responses.genericSuccessResponse(200, 'user added')
        return response
    }catch (err) {
        if(err.code == 11000) throw new Error(err.code)
        else{
            throw new Error(err.message)
        }
    }
}

async function login(username, password){
    try {
        const u = await User.findOne({username: username}).where('status').equals('ACTIVE')
        if(u == null){
            return responses.INVALID_USERNAME_OR_PW
        }
        const userSalt = u.salt
        if(checkUserPw(password, u.password, userSalt)){
            let response = responses.genericSuccessResponse(200,u._id)
            return response
            // return {status: 0, userId: u._id}
        }else{
            console.log(responses.INVALID_USERNAME_OR_PW)
            return responses.INVALID_USERNAME_OR_PW
        }
    }catch (err) {
        throw new Error(err.message)
    }
}

async function searchUserById(id) {

    if(!mongoose.isValidObjectId(id)){
        return responses.INVALID_ID
    }
    try {
        const u = await User.findById(id).where('status').equals('ACTIVE')
        if(u == null) {
            return responses.INVALID_ID
        }
        let data = {
            id: u._id,
            username: u.username,
            email: u.email,
            totMatches: u.totMatches,
            totWins: u.totWins,
            friends: u.friends,
            status: u.status
        }
        let response = responses.genericSuccessResponse(200, data)
        return response
    }catch (err) {
        throw new Error(err.message)
    }
}

async function getAllUsers() {
    try {
        const l = await User.where("status").equals('ACTIVE').select({
            password: 0,
            salt: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        })
        let response = responses.genericSuccessResponse(200, l)
        console.log(response.data)
        return response
    } catch (err) {
        throw new Error(err.message)
    }
}

async function updateUsername(newUsername, oldPassword, id){
    if(!mongoose.isValidObjectId(id)){
        return responses.INVALID_ID
    }
    try {
        const data = await getUserPassword(id)
        if(data == null || !checkUserPw(oldPassword, data.hash, data.salt)){
            return responses.GENERIC_ERROR
        }
        let ret = await User.findOneAndUpdate({_id: id}, {username: newUsername}, {new: true})
        return responses.UPDATE_SUCCESS
    }catch(err){
        throw new Error(err.message)
    }
}

async function updatePassword(oldPassword, newPassword, id){
    if(!mongoose.isValidObjectId(id)){
        return responses.INVALID_ID 
    }
    try {
        const data = await getUserPassword(id)
        if(data == null || !checkUserPw(oldPassword, data.hash, data.salt)) { 
            return responses.GENERIC_ERROR
        }
        let update = {password: crypto.createHash('sha256').update(newPassword + data.salt).digest('base64')}
        let ret = await User.findOneAndUpdate({_id: id}, update, {new: true})
        return responses.UPDATE_SUCCESS
    }catch(err) {
        throw new Error(err.message)
    }
}

// delete account version 2 (sets account status to DELETED)
async function deleteAccountV2(id) {
    if(!mongoose.isValidObjectId(id)){
        return responses.INVALID_ID
    }
    try{
        let ret = await User.findOneAndUpdate({_id: id}, {status: 'DELETED'})
        if(ret == null){
            return responses.INVALID_ID 
        }
        return responses.DELETE_SUCCESS
    }catch(err){
        throw new Error(err.message)
    }
}

module.exports = {signup, login, searchUserById, getAllUsers, updatePassword, updateUsername, deleteAccountV2}