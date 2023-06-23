const jwt = require('jsonwebtoken')
require('dotenv').config()
const refreshToken = require('../models/refreshToken')
const { default: mongoose } = require('mongoose')
const responses = require('../models/responses')

function generateTokens(data) {
    return {
        accessToken: jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'}),
        refreshToken: jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
    }
}

async function insertRefreshToken(tk, userId) {
    try {
        const tkn = await refreshToken.create({
            refresh_token: tk,
            userId: userId
        })
        let response = responses.genericSuccessResponse(200, 'refresh token added')
        return response
    }catch(err) {
        if(err.code == 11000){
            throw new Error('you are already logged in...')
        }else{
            throw new Error(err.message)
        }
    }
}

async function removeRefreshToken(tk) {
    
    try {
        let result = await refreshToken.deleteOne({
            refresh_token: tk
        })
        if(result.deletedCount === 0){
            return responses.GENERIC_NOT_FOUND
        }
        let response = responses.genericSuccessResponse(200, {})
        return response
    }catch(err) {
        throw new Error(err.message)
    }
}

async function findRefreshToken(tk){
    try{
        res = await refreshToken.exists({refresh_token:tk})
        if(res == null) {
            return responses.FORBIDDEN_ERROR
        }else{
            return true
        }
    }catch(err) {
        throw new Error(err.message)
    }
}

async function deleteAllTokens(){
    try{
        await refreshToken.collection.drop()
        return responses.DELETE_SUCCESS
    }catch(err){
        throw new Error(err.message)
    }
}



module.exports = {generateTokens, insertRefreshToken, removeRefreshToken, findRefreshToken, deleteAllTokens}