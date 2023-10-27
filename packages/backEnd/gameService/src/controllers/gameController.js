const Game = require("../models/game");
const {
    default: mongoose
} = require("mongoose");
const responses = require("../models/responses");

async function getAllGames() {
    const games = await Game.find({});

    return responses.genericSuccessResponse(200, games);
}

async function getGame(id) {
    if (!mongoose.isValidObjectId(id)) {
        return responses.INVALID_ID;
    }

    const game = await Game.findById(id);

    if (game == null) {
        return responses.INVALID_ID;
    }

    let gameToRetrieve = {
        id: game._id,
        name: game.name,
        duration: game.description,
        playersNumber: game.playersNumber
    };

    return responses.genericSuccessResponse(200, gameToRetrieve);
}

async function getGameByName(name) {
    const game = await Game.findOne({
        name: name
    });

    if (game == null) {
        return responses.INVALID_NAME;
    }

    let gameToRetrieve = {
        id: game._id,
        name: game.name,
        description: game.description,
        playersNumber: game.playersNumber
    };

    return responses.genericSuccessResponse(200, gameToRetrieve);
}

async function updateGame(gameName, gameDescription, gamePlayersNumber, id) {
    if (!mongoose.isValidObjectId(id)) {
        return responses.INVALID_ID;
    }

    let gameUpdated = {
        name: gameName,
        description: gameDescription,
        playersNumber: gamePlayersNumber,
    };

    await Game.findByIdAndUpdate({
        _id: id
    }, gameUpdated, {
        new: true,
        overwrite: true,
    });

    return responses.UPDATE_SUCCESS;
}

async function createGame(gameName, gameDescription, gamePlayersNumber) {
    await Game.create({
        name: gameName,
        description: gameDescription,
        playersNumber: gamePlayersNumber,
    });

    return responses.genericSuccessResponse(200, "Game added");
}

module.exports = {
    getAllGames,
    getGame,
    getGameByName,
    updateGame,
    createGame,
};