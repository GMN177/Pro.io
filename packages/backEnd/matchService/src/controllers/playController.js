const Play = require("../models/play");
const {default: mongoose} = require("mongoose");
const responses = require("../models/responses");

async function getByUser(userId) {
    try {
        const plays = await Play.find({user: userId});
        if(plays == null) {
            return responses.INVALID_USER;
        }

        return responses.genericSuccessResponse(200, plays);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getByMatch(matchId) {
    try {
        const plays = await Play.find({match: matchId});
        if(plays == null) {
            return responses.INVALID_MATCH;
        }

        return responses.genericSuccessResponse(200, plays);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getByMatchAndUser(matchId, userId) {
    try {
        const plays = await Play.find({match: matchId, user: userId});
        if(plays == null) {
            return responses.PLAY_NOT_FOUND;
        }

        return responses.genericSuccessResponse(200, plays);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function createPlay(userId, matchId) {
    try {
        const playToAdd = await Play.create({
            match: matchId,
            user: userId,
            isWinner: false,
            points: 0
        });
        return responses.genericSuccessResponse(200, "Play added");
    } catch (err) {
        if (err.code === 11000) throw new Error(err.code);
        else {
            throw new Error(err.message);
        }
    }
}


async function updatePlay(id, userId, matchId, isWinner, points) {
    if (!mongoose.isValidObjectId(id)) {
        return responses.INVALID_ID;
    }
    try {
        let playUpdated = {
            match: matchId,
            user: userId,
            isWinner: isWinner,
            points: points
        };
        let ret = await Play.findByIdAndUpdate({ _id: id }, playUpdated, {
            new: true,
            overwrite: true,
        });
        return responses.UPDATE_SUCCESS;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getByUser,
    getByMatch,
    getByMatchAndUser,
    createPlay,
    updatePlay
};
