const Match = require("../models/match");
const {default: mongoose} = require("mongoose");
const responses = require("../models/responses");
const {createPlay, getByMatchAndUser} = require("./playController");
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
async function matchmaking(gameId, userId, token) {
    try {
        const matches = await Match.find({game: gameId});
        //console.log(matches)
        if (matches == null) {
            return responses.INVALID_GAME;
        }

        let valid_matches = matches.filter( match => {
            return match.status === "WAIT"
        })

        if(valid_matches.length === 0) {
            createMatch(gameId, 2000, new Date(), null, "WAIT", userId);
            return responses.genericSuccessResponse(200, "Match added");
        } else {
            let match = valid_matches[Math.floor(Math.random()*valid_matches.length)];
            await createPlay(userId, match._id);

            fetch('http://localhost:4001/api/games/' + gameId, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(result => result.json())
                .then(async data => {
                    const plays = await getByMatchAndUser(match._id, userId)

                    if(data.data.message.playersNumber === plays.response.data.message.length) {
                        await updateMatch(match._id, gameId, match.duration, new Date(), match.endTime, "INGAME")
                    }
                })

            return responses.genericSuccessResponse(200, match, "Play added");
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

async function createMatch(gameId, duration, startTime, endTime, status, userId) {
    //TODO chiamo createPlayed
    try {
        let match = (await Match.create({
            game: gameId,
            duration: duration,
            startTime: startTime,
            endTime: endTime,
            status: status
        }))._id;

        console.log(match)

        createPlay(userId, match)
        return responses.genericSuccessResponse(200, "Match added");
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

module.exports = {
    getAllMatches,
    getMatch,
    getMatchesByGame,
    createMatch,
    updateMatch,
    matchmaking
};