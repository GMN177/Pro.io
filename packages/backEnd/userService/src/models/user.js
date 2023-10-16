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
    friends: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    pending: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    sent: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    status: String

}, {timestamps: true})

user = mongoose.model("user", userSchema)

module.exports = user
