require('dotenv').config()
const mongoose = require('mongoose')

function connectToDatabase() {
    mongoose.set('strictQuery', true)
    return mongoose.connect(process.env.DB_URI)
}

module.exports = {connectToDatabase}
