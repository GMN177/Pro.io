const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
    refresh_token : {
        type: String,
        unique:  true
    },
    userId: {
        type: String,
        unique: true
    }
},{timestamp: true})

refreshToken = mongoose.model("refreshToken", refreshTokenSchema)

module.exports = refreshToken