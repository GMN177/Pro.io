require('dotenv').config()
const mongoose = require('mongoose')

function connectToDatabase() {
    mongoose.set('strictQuery', true)
    return mongoose.connect(process.env.USER_DB_URI)
}

module.exports = {connectToDatabase}

