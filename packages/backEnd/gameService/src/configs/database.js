const mongoose = require('mongoose');

function connectToDatabase() {
    mongoose.set('strictQuery', true);
    return mongoose.connect(process.env.GAME_DB_URI, {
        useNewUrlParser: true
    });
}

async function seedDatabase() {
    const Game = require('../models/game');
    const games = require('./games.json');

    const count = await Game.countDocuments();

    if (count > 0) {
        return;
    }

    await Game.insertMany(games);
}

module.exports = {
    connectToDatabase,
    seedDatabase
}