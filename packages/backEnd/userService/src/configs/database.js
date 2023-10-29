const mongoose = require('mongoose');

function connectToDatabase() {
    mongoose.set('strictQuery', true);
    return mongoose.connect(process.env.USER_DB_URI, {
        useNewUrlParser: true
    });
}

async function seedDatabase() {
    const User = require('../models/user');
    const users = require('./users.json');

    const count = await User.countDocuments();

    if (count > 0) {
        return;
    }

    await User.insertMany(users);
}

module.exports = {
    connectToDatabase,
    seedDatabase
}