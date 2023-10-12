const Match = require("../models/match");
const {default: mongoose} = require("mongoose");
const responses = require("../models/responses");
const {getByMatch} = require("./playController");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

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

//do matchmaking --> check if status is wait --> add player --> createPlayed
//se giocatori necessari --> status INGAME
//se giocatore esce da match ancora in WAIT --> deletePlayed
//status: { WAIT, INGAME, FINISHED }
async function matchmaking(gameId, token) {
    try {
        const matches = await Match.find({game: gameId});

        if (matches == null) {
            return responses.INVALID_GAME;
        }

        let valid_matches = matches.filter( match => {
            return match.status === "WAIT"
        })

        if(valid_matches.length === 0) {
            let match = await createMatch(gameId, 2000, new Date(), null, "WAIT");

            return responses.genericSuccessResponse(200, match.response.data.message);
        } else {
            let match = valid_matches[Math.floor(Math.random() * valid_matches.length)];

            fetch('http://gameservice:4000/api/games/' + gameId, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(result => result.json())
                .then(async data => {
                    const plays = await getByMatch(match._id)

                    if(data.data.message.playersNumber === plays.response.data.message.length) {
                        await updateMatch(match._id, gameId, match.duration, new Date(), match.endTime, "INGAME")
                    }
                })

            return responses.genericSuccessResponse(200, match._id);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

async function createMatch(gameId, duration, startTime, endTime, status) {
    try {
        let matchId = (await Match.create({
            game: gameId,
            duration: duration,
            startTime: startTime,
            endTime: endTime,
            status: status
        }))._id;

        return responses.genericSuccessResponse(200, matchId);
    } catch (err) {
        if (err.code === 11000) throw new Error(err.code);
        else {
            throw new Error(err.message);
        }
    }
}

//TODO quando stato passa a INGAME modifico startTime
//TODO quando stato passa a FINISHED modifico endTime
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

async function createPrivateMatch(gameId, userId) {
    try {
        let match = await createMatch(gameId, 2000, new Date(), null, "RESERVED", userId);

        return responses.genericSuccessResponse(200, match.response.data.message);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function joinPrivateMatch(matchId, token) {
    try {
        const match = await Match.findById(matchId);

        if (match == null) {
            return responses.INVALID_ID;
        }

        if (match.status !== "RESERVED") {
            return responses.INVALID_MATCH;
        }

        let game = await fetch('http://gameservice:4000/api/games/' + gameId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            
        game = await game.json()

        const plays = await getByMatch(match._id)

        if(game.data.message.playersNumber === plays.response.data.message.length) {
            await updateMatch(match._id, gameId, match.duration, new Date(), match.endTime, "INGAME")
        }

        return responses.genericSuccessResponse(200, match._id);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function deleteAllMatches() {
    try {
        await Match.deleteMany({});
        return responses.DELETE_SUCCESS;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getAllMatches,
    getMatch,
    getMatchesByGame,
    createMatch,
    updateMatch,
    matchmaking,
    createPrivateMatch,
    joinPrivateMatch,
    deleteAllMatches
};
