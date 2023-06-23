require('dotenv').config()
const mongoose = require('mongoose')

function connectToDatabase() {
    mongoose.set('strictQuery', true)
    //return mongoose.connect("mongodb://127.0.0.1:27017/proioUserService", { useNewUrlParser: true })
    return mongoose.connect(process.env.USER_DB_URI, { useNewUrlParser: true })
}

module.exports = {connectToDatabase}

