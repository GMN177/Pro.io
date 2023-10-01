const {
    getMatch
} = require('../connectors/toMatchService');
const {
    sendEventAndEmitNewState
} = require('../utils');
const {
    gameStates
} = require('../handlers/game.js');

let matches = {};

const onConnection = (io) => {
    return async (socket) => {
        try {
            let playerId = socket.playerId;
            let matchId = socket.handshake.query.matchId;

            console.log("New connection: " + socket.id);
            console.log('playerId:', playerId);
            console.log('matchId:', matchId);

            await socket.join(matchId);

            let match;
            if (socket.handshake.query.matchId in matches) {
                match = matches[socket.handshake.query.matchId];
            } else {
                match = await getMatch(socket.handshake.query.matchId);
                match.state = JSON.stringify(gameStates.initialState);
                matches[socket.handshake.query.matchId] = match;
            }

            console.log('matches:', matches);

            setTimeout(() => {
                sendEventAndEmitNewState(io, gameStates, null, matches[matchId]);
            }, 1000);

            socket.on("READY", (msg) => {
                sendEventAndEmitNewState(socket, gameStates, {
                    type: "READY",
                    value: msg.player
                }, matches[matchId]);
            });

            socket.on("PLAY", (msg) => {
                sendEventAndEmitNewState(socket, gameStates, {
                    type: "PLAY",
                    player: msg.player,
                    value: msg.i
                }, matches[matchId]);
            });

            socket.on("RESET", () => {
                sendEventAndEmitNewState(socket, gameStates, {
                    type: "RESET"
                }, matches[matchId]);
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        } catch (err) {
            console.log(err);
        }
    }
};

const onConnectionError = (err) => {
    console.log(`connect_error due to ${err.message}`);
};

module.exports = {
    onConnection,
    onConnectionError
};