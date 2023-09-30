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
            let matchId = socket.handshake.query.matchId;

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

            console.log("New connection: " + socket.id);

            await socket.join(matchId);

            console.log("New client connected in room: " + matchId);

            if (!(matchId in matches)) {
                let match = await getMatch(matchId);
                match.state = JSON.stringify(gameStates.initialState);
                matches[matchId] = match;
            }

            console.log('matches:', matches);

            setTimeout(() => {
                sendEventAndEmitNewState(io, gameStates, null, matches[matchId]);
            }, 1000);
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