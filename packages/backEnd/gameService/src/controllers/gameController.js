const Game = require("../models/game");
const { default: mongoose } = require("mongoose");
const responses = require("../models/responses");

async function getAllGames() {
  try {
    const games = await Game.find({});

    return response = responses.genericSuccessResponse(200, games);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getGame(id) {
  if (!mongoose.isValidObjectId(id)) {
    return responses.INVALID_ID;
  }
  try {
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

    return response = responses.genericSuccessResponse(200, gameToRetrieve);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getGameByName(name) {
  try {
    const game = await Game.findOne({ name: name });
    if (game == null) {
      return responses.INVALID_NAME;
    }
    let gameToRetrieve = {
      id: game._id,
      name: game.name,
      description: game.description,
      playersNumber: game.playersNumber
    };

    return response = responses.genericSuccessResponse(200, gameToRetrieve);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function updateGame(gameName, gameDescription, gamePlayersNumber, id) {
  if (!mongoose.isValidObjectId(id)) {
    return responses.INVALID_ID;
  }
  try {
    let gameUpdated = {
      name: gameName,
      description: gameDescription,
      playersNumber: gamePlayersNumber,
    };
    let ret = await Game.findByIdAndUpdate({ _id: id }, gameUpdated, {
      new: true,
      overwrite: true,
    });
    return responses.UPDATE_SUCCESS;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function createGame(gameName, gameDescription, gamePlayersNumber) {
  try {
    const gameToAdd = await Game.create({
      name: gameName,
      description: gameDescription,
      playersNumber: gamePlayersNumber,
    });
    return response = responses.genericSuccessResponse(200, "Game added");
  } catch (err) {
    if (err.code === 11000) throw new Error(err.code);
    else {
      throw new Error(err.message);
    }
  }
}

module.exports = {
  getAllGames,
  getGame,
  getGameByName,
  updateGame,
  createGame,
};
