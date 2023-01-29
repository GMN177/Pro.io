const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: String,
    password: String,
    salt: String,
    totMatches: Number,
    totWins: Number,
    friends: [mongoose.Types.ObjectId],
    status: String

}, {timestamps: true})

us = mongoose.model("user", userSchema)

module.exports = us
