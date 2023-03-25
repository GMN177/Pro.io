const Macth = require("../models/match");
const {default: mongoose} = require("mongoose");
const responses = require("../models/responses");

async function getAllMatches() {
    try {
        const matches = await Macth.find({});

        console.log(matches);

        return response = responses.genericSuccessResponse(200, matches);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getMatch(id) {
    console.log("ID");
    if (!mongoose.isValidObjectId(id)) {
        return responses.INVALID_ID;
    }
    try {
        const match = await Macth.findById(id);
        if (match == null) {
            return responses.INVALID_ID;
        }
        let matchToRetrieve = {
            id: match._id,
            game: match.game,
            duration: match.duration,
            startTime: match.startTime,
            endTime: match.endTime,
            status: match.status
        };

        return response = responses.genericSuccessResponse(200, matchToRetrieve);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getMatchesByGame(gameId) {
    console.log("GAMEID");
    try {
        const match = await Macth.findOne({game: gameId});
        if (match == null) {
            return responses.INVALID_GAME;
        }
        let gameToRetrieve = {
            id: match._id,
            game: match.game,
            duration: match.duration,
            startTime: match.startTime,
            endTime: match.endTime,
            status: match.status
        };

        return response = responses.genericSuccessResponse(200, gameToRetrieve);
    } catch (err) {
        throw new Error(err.message);
    }
}

/*async function createGame(gameName, gameDescription, gamePlayersNumber) {
    try {
        const gameToAdd = await Game.create({
            name: gameName,
            description: gameDescription,
            playersNumber: gamePlayersNumber,
        });
        let response = responses.genericSuccessResponse(200, "Game added");
        return response;
    } catch (err) {
        if (err.code == 11000) throw new Error(err.code);
        else {
            throw new Error(err.message);
        }
    }
}*/

module.exports = {
    getAllMatches,
    getMatch,
    getMatchesByGame,
};
