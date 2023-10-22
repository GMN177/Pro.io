const mongoose = require('mongoose')

function connectToDatabase() {
    mongoose.set('strictQuery', true)
    return mongoose.connect(process.env.MATCH_DB_URI)
}

module.exports = {connectToDatabase}