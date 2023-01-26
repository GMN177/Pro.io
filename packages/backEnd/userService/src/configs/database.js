require('dotenv').config()
const mongoose = require('mongoose')

function connectToDatabase(){
    mongoose.connect(process.env.DB_URI, () => {
        console.log("connected to Database!")
    })
}

module.exports = {connectToDatabase}

