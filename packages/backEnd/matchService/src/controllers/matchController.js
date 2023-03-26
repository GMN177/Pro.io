const Match = require("../models/match");
const {default: mongoose} = require("mongoose");
const responses = require("../models/responses");

async function getAllMatches() {
    try {
        const matches = await Match.find({});

        return responses.genericSuccessResponse(200, matches);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getMatch(id) {
    if (!mongoose.isValidObjectId(id)) {
        return responses.INVALID_ID;
    }
    try {
        const match = await Match.findById(id);
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

        return responses.genericSuccessResponse(200, matchToRetrieve);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getMatchesByGame(gameId) {
    try {
        const matches = await Match.find({game: gameId});
        if (matches == null) {
            return responses.INVALID_GAME;
        }

        return responses.genericSuccessResponse(200, matches);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function createMatch(gameId, duration, startTime, endTime, status) {
    try {
        await Match.create({
            game: gameId,
            duration: duration,
            startTime: startTime,
            endTime: endTime,
            status: status
        });
        return responses.genericSuccessResponse(200, "Match added");
    } catch (err) {
        if (err.code === 11000) throw new Error(err.code);
        else {
            throw new Error(err.message);
        }
    }
}


async function updateMatch(id, gameId, duration, startTime, endTime, status) {
    if (!mongoose.isValidObjectId(id)) {
        return responses.INVALID_ID;
    }
    try {
        let matchUpdated = {
            game: gameId,
            duration: duration,
            startTime: startTime,
            endTime: endTime,
            status: status
        };
        await Match.findByIdAndUpdate({ _id: id }, matchUpdated, {
            new: true,
            overwrite: true,
        });
        return responses.UPDATE_SUCCESS;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getAllMatches,
    getMatch,
    getMatchesByGame,
    createMatch,
    updateMatch
};
